#!/usr/bin/env python3
"""
Chatbot Stress Test
Tests RAG chatbot performance, accuracy, and edge cases
"""

import requests
import time
import json
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Dict, List, Tuple

API_URL = "http://localhost:3456/api/chat"

# Test cases: (name, query, expected_keywords)
TEST_CASES = [
    # Category 1: Founder & Company Information
    ("Founder Name", "Who founded the company?", ["jerome", "palencia"]),
    ("Founded Date", "When was Northbound Studios founded?", ["2026", "january"]),
    ("Location", "Where is Northbound Studios located?", ["san francisco"]),
    ("Business Address", "What is your address?", ["845 howard", "94103"]),

    # Category 2: Pricing Information
    ("Basic Chatbot Price", "How much does a basic chatbot cost?", ["2,500", "5,000"]),
    ("Custom AI Price", "What's the cost for custom AI integration?", ["5,000", "15,000"]),
    ("Advanced System Price", "How much for an advanced AI system?", ["15,000"]),

    # Category 3: Company Philosophy & Values
    ("Core Philosophy", "What is your company philosophy?", ["systems", "performance"]),
    ("Approach", "What's your approach?", ["growth", "ai", "technology"]),

    # Category 4: Northbound Films Relationship
    ("Films Company", "Tell me about Northbound Films", ["film", "production", "cinematic"]),
    ("Relationship", "How are Northbound Studios and Films related?", ["jerome", "distinct", "founder"]),
    ("Distinction", "What's the difference between Studios and Films?", ["distinct", "separate"]),

    # Category 5: Services & Offerings
    ("AI Apps", "What AI applications do you build?", ["ai", "custom"]),
    ("RAG Systems", "Do you build RAG systems?", ["rag", "knowledge"]),
    ("Web Development", "What web development services do you offer?", ["web", "platform"]),
    ("All Services", "What services do you provide?", ["ai", "web"]),

    # Category 6: AI-Native Definition
    ("AI-Native Meaning", "What does AI-native mean?", ["ai", "core", "infrastructure"]),

    # Category 7: Social Media & Contact
    ("LinkedIn", "What is your LinkedIn?", ["linkedin"]),
    ("Instagram", "How can I find you on Instagram?", ["instagram"]),

    # Category 8: Edge Cases
    ("Multi-Part Query", "Who founded the company and how much does a chatbot cost?", ["jerome", "2,500"]),
    ("Vague Query", "Tell me about yourselves", ["northbound", "ai"]),
    ("Typo Tolerance", "Who is the fouder?", ["founder"]),
]

def test_query(name: str, query: str, expected_keywords: List[str]) -> Dict:
    """Execute a single test query"""
    try:
        start_time = time.time()

        response = requests.post(
            API_URL,
            json={"message": query, "type": "rag"},
            headers={"Content-Type": "application/json"},
            timeout=30
        )

        duration = (time.time() - start_time) * 1000  # ms

        if response.status_code != 200:
            return {
                "name": name,
                "query": query,
                "status": "FAIL",
                "error": f"HTTP {response.status_code}",
                "duration": duration
            }

        data = response.json()
        response_text = data.get("response", "").lower()
        sources_count = len(data.get("sources", []))
        has_relevant = data.get("metadata", {}).get("hasRelevantContent", False)

        # Check if any expected keywords are in the response
        found_keywords = [kw for kw in expected_keywords if kw.lower() in response_text]
        passed = len(found_keywords) > 0

        return {
            "name": name,
            "query": query,
            "status": "PASS" if passed else "FAIL",
            "duration": duration,
            "response": data.get("response", "")[:200],  # Truncate
            "sources_count": sources_count,
            "has_relevant": has_relevant,
            "found_keywords": found_keywords,
            "expected_keywords": expected_keywords
        }

    except Exception as e:
        return {
            "name": name,
            "query": query,
            "status": "ERROR",
            "error": str(e),
            "duration": 0
        }

def run_concurrent_tests(num_concurrent: int = 10) -> List[Dict]:
    """Run multiple concurrent requests"""
    print(f"\n🔥 Running {num_concurrent} concurrent requests...")
    results = []

    with ThreadPoolExecutor(max_workers=num_concurrent) as executor:
        futures = [
            executor.submit(test_query, f"Concurrent {i+1}", "Who is the founder?", ["jerome"])
            for i in range(num_concurrent)
        ]

        for future in as_completed(futures):
            results.append(future.result())

    return results

def main():
    print("🚀 Starting Chatbot Stress Test")
    print("=" * 60)

    all_results = []
    passed = 0
    failed = 0
    errors = 0
    total_duration = 0

    # Run sequential tests
    print("\n📋 Running Sequential Tests...\n")
    for name, query, expected_keywords in TEST_CASES:
        print(f"Testing: {name}... ", end="", flush=True)
        result = test_query(name, query, expected_keywords)
        all_results.append(result)

        if result["status"] == "PASS":
            passed += 1
            print(f"✅ PASS ({result['duration']:.0f}ms)")
        elif result["status"] == "FAIL":
            failed += 1
            print(f"❌ FAIL ({result['duration']:.0f}ms)")
            print(f"   Expected: {result['expected_keywords']}")
            print(f"   Found: {result['found_keywords']}")
        else:
            errors += 1
            print(f"⚠️  ERROR: {result.get('error', 'Unknown')}")

        total_duration += result.get("duration", 0)

    # Run concurrent tests
    concurrent_results = run_concurrent_tests(10)
    all_results.extend(concurrent_results)

    concurrent_passed = sum(1 for r in concurrent_results if r["status"] == "PASS")
    concurrent_failed = sum(1 for r in concurrent_results if r["status"] == "FAIL")
    concurrent_errors = sum(1 for r in concurrent_results if r["status"] == "ERROR")
    concurrent_avg_time = sum(r.get("duration", 0) for r in concurrent_results) / len(concurrent_results)

    print(f"   Passed: {concurrent_passed}")
    print(f"   Failed: {concurrent_failed}")
    print(f"   Errors: {concurrent_errors}")
    print(f"   Avg Response Time: {concurrent_avg_time:.0f}ms")

    # Summary
    total_passed = passed + concurrent_passed
    total_failed = failed + concurrent_failed
    total_errors = errors + concurrent_errors
    total_tests = len(all_results)

    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    print(f"Total Tests: {total_tests}")
    print(f"Passed: {total_passed} ✅")
    print(f"Failed: {total_failed} ❌")
    print(f"Errors: {total_errors} ⚠️")
    print(f"Success Rate: {(total_passed/total_tests)*100:.1f}%")
    print(f"Avg Response Time: {total_duration/len(TEST_CASES):.0f}ms")
    print("=" * 60)

    # Detailed failures
    if total_failed > 0 or total_errors > 0:
        print("\n❌ Failed Tests:")
        for result in all_results:
            if result["status"] in ["FAIL", "ERROR"]:
                print(f"\n  Test: {result['name']}")
                print(f"  Query: {result['query']}")
                print(f"  Status: {result['status']}")
                if "error" in result:
                    print(f"  Error: {result['error']}")
                else:
                    print(f"  Expected: {result.get('expected_keywords', [])}")
                    print(f"  Found: {result.get('found_keywords', [])}")
                    print(f"  Response: {result.get('response', '')[:150]}...")

    return 0 if total_failed == 0 and total_errors == 0 else 1

if __name__ == "__main__":
    exit(main())
