import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class ZeroDBClient {
  private client: AxiosInstance;
  private apiKey: string | null = null;
  private projectId: string;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_AINATIVE_API_URL!;
    this.projectId = process.env.NEXT_PUBLIC_ZERODB_PROJECT_ID!;

    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use((config) => {
      if (this.apiKey) {
        // Auto-detect JWT vs API key
        if (this.apiKey.startsWith('eyJ')) {
          config.headers.Authorization = `Bearer ${this.apiKey}`;
        } else {
          config.headers['X-API-Key'] = this.apiKey;
        }
      }
      return config;
    });
  }

  setApiKey(key: string) {
    this.apiKey = key;
  }

  // Table Operations
  async insertTable<T>(tableName: string, data: T): Promise<any> {
    const response = await this.client.post(
      `/v1/public/zerodb/tables/${tableName}/insert`,
      { rows: [data] }
    );
    return response.data;
  }

  async queryTable(tableName: string, filter?: any): Promise<any> {
    const response = await this.client.post(
      `/v1/public/zerodb/tables/${tableName}/query`,
      { filter, limit: 100 }
    );
    return response.data;
  }

  // Vector Operations
  async searchSimilarText(
    collectionName: string,
    queryText: string,
    topK: number = 10
  ): Promise<any> {
    const response = await this.client.post(
      '/v1/public/zerodb/vectors/search/text',
      {
        collection_name: collectionName,
        query_text: queryText,
        top_k: topK,
      }
    );
    return response.data;
  }

  async upsertVectors(
    collectionName: string,
    vectors: Array<{
      id: string;
      vector?: number[];
      text?: string;
      metadata?: Record<string, any>;
    }>
  ): Promise<any> {
    const response = await this.client.post(
      '/v1/public/zerodb/vectors/upsert',
      {
        collection_name: collectionName,
        vectors,
      }
    );
    return response.data;
  }

  // Memory Operations
  async storeMemory(data: {
    session_id: string;
    message: string;
    response: string;
    message_type: string;
  }): Promise<any> {
    const response = await this.client.post(
      `/projects/${this.projectId}/database/memory/store`,
      {
        agent_id: 'blaq-chatbot',
        session_id: data.session_id,
        content: data.message,
        role: 'user',
        metadata: {
          response: data.response,
          message_type: data.message_type,
        },
      }
    );
    return response.data;
  }

  async searchMemory(sessionId: string, query: string, limit: number = 10): Promise<any> {
    const response = await this.client.post(
      `/projects/${this.projectId}/database/memory/search`,
      {
        query,
        session_id: sessionId,
        limit,
      }
    );
    return response.data;
  }
}

// Singleton instance
export const zerodb = new ZeroDBClient();

// Initialize with API key from environment
if (typeof window !== 'undefined') {
  // Client-side: use public API key
  zerodb.setApiKey(process.env.NEXT_PUBLIC_AINATIVE_API_KEY!);
}
