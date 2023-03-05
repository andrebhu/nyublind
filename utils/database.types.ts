export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          author: string
          content: string
          created_at: string | null
          id: number
          likes: number
          parent_comment_id: number | null
          "post_id ": number
        }
        Insert: {
          author: string
          content: string
          created_at?: string | null
          id: number
          likes?: number
          parent_comment_id?: number | null
          "post_id "?: number
        }
        Update: {
          author?: string
          content?: string
          created_at?: string | null
          id?: number
          likes?: number
          parent_comment_id?: number | null
          "post_id "?: number
        }
      }
      posts: {
        Row: {
          author: string
          content: string
          created_at: string | null
          id: number
          likes: number
          title: string
          views: number
        }
        Insert: {
          author: string
          content: string
          created_at?: string | null
          id?: number
          likes?: number
          title: string
          views?: number
        }
        Update: {
          author?: string
          content?: string
          created_at?: string | null
          id?: number
          likes?: number
          title?: string
          views?: number
        }
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
