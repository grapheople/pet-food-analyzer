export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      community_comments: {
        Row: {
          content: string
          content_en: string | null
          created_at: string
          id: string
          is_anonymous: boolean
          pet_name: string
          pet_profile_id: number | null
          pet_species: string | null
          post_id: string
          user_id: number
        }
        Insert: {
          content: string
          content_en?: string | null
          created_at?: string
          id?: string
          is_anonymous?: boolean
          pet_name?: string
          pet_profile_id?: number | null
          pet_species?: string | null
          post_id: string
          user_id: number
        }
        Update: {
          content?: string
          content_en?: string | null
          created_at?: string
          id?: string
          is_anonymous?: boolean
          pet_name?: string
          pet_profile_id?: number | null
          pet_species?: string | null
          post_id?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "community_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "community_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_community_comments_pet_profile"
            columns: ["pet_profile_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      community_post_participants: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: number
          user_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: number
          user_name?: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: number
          user_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "community_post_participants_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "community_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      community_posts: {
        Row: {
          author_display_name: string
          board_type: string
          category: string | null
          content: string
          content_en: string | null
          country_code: string | null
          created_at: string
          help_type: string | null
          id: string
          image_url: string | null
          image_urls: Json | null
          is_anonymous: boolean
          latitude: number | null
          longitude: number | null
          meetup_datetime: string | null
          meetup_location: string | null
          pet_name: string
          pet_photo_url: string | null
          pet_profile_id: number | null
          pet_species: string | null
          user_id: number
          user_name: string | null
          write_date: string | null
        }
        Insert: {
          author_display_name?: string
          board_type: string
          category?: string | null
          content: string
          content_en?: string | null
          country_code?: string | null
          created_at?: string
          help_type?: string | null
          id?: string
          image_url?: string | null
          image_urls?: Json | null
          is_anonymous?: boolean
          latitude?: number | null
          longitude?: number | null
          meetup_datetime?: string | null
          meetup_location?: string | null
          pet_name?: string
          pet_photo_url?: string | null
          pet_profile_id?: number | null
          pet_species?: string | null
          user_id: number
          user_name?: string | null
          write_date?: string | null
        }
        Update: {
          author_display_name?: string
          board_type?: string
          category?: string | null
          content?: string
          content_en?: string | null
          country_code?: string | null
          created_at?: string
          help_type?: string | null
          id?: string
          image_url?: string | null
          image_urls?: Json | null
          is_anonymous?: boolean
          latitude?: number | null
          longitude?: number | null
          meetup_datetime?: string | null
          meetup_location?: string | null
          pet_name?: string
          pet_photo_url?: string | null
          pet_profile_id?: number | null
          pet_species?: string | null
          user_id?: number
          user_name?: string | null
          write_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "community_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_community_posts_pet_profile"
            columns: ["pet_profile_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      deleted_accounts: {
        Row: {
          deleted_at: string
          id: number
          provider: string
          provider_id: string
        }
        Insert: {
          deleted_at?: string
          id?: never
          provider?: string
          provider_id?: string
        }
        Update: {
          deleted_at?: string
          id?: never
          provider?: string
          provider_id?: string
        }
        Relationships: []
      }
      food_analyses: {
        Row: {
          animal_type: string | null
          calories_g: number
          created_at: string
          food_amount_g: number | null
          food_name: string | null
          food_name_en: string | null
          id: string
          image_storage_path: string | null
          image_url: string | null
          ingredients: Json
          ingredients_en: Json | null
          nutrients: Json
          overall_rating: number | null
          rating_summary: string | null
          rating_summary_en: string | null
          raw_ai_response: Json | null
          recommendations: string | null
          recommendations_en: string | null
          updated_at: string
        }
        Insert: {
          animal_type?: string | null
          calories_g?: number
          created_at?: string
          food_amount_g?: number | null
          food_name?: string | null
          food_name_en?: string | null
          id?: string
          image_storage_path?: string | null
          image_url?: string | null
          ingredients?: Json
          ingredients_en?: Json | null
          nutrients?: Json
          overall_rating?: number | null
          rating_summary?: string | null
          rating_summary_en?: string | null
          raw_ai_response?: Json | null
          recommendations?: string | null
          recommendations_en?: string | null
          updated_at?: string
        }
        Update: {
          animal_type?: string | null
          calories_g?: number
          created_at?: string
          food_amount_g?: number | null
          food_name?: string | null
          food_name_en?: string | null
          id?: string
          image_storage_path?: string | null
          image_url?: string | null
          ingredients?: Json
          ingredients_en?: Json | null
          nutrients?: Json
          overall_rating?: number | null
          rating_summary?: string | null
          rating_summary_en?: string | null
          raw_ai_response?: Json | null
          recommendations?: string | null
          recommendations_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      gem_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          id: number
          reason: string
          reference_id: string | null
          type: string
          user_id: number
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          id?: never
          reason: string
          reference_id?: string | null
          type: string
          user_id: number
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          id?: never
          reason?: string
          reference_id?: string | null
          type?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "gem_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiry: {
        Row: {
          admin_replied_at: string | null
          admin_reply: string | null
          body: string
          category: string
          created_at: string
          email: string | null
          id: number
          image_url: string | null
          is_processed: boolean
          title: string
          user_id: number
        }
        Insert: {
          admin_replied_at?: string | null
          admin_reply?: string | null
          body: string
          category: string
          created_at?: string
          email?: string | null
          id?: never
          image_url?: string | null
          is_processed?: boolean
          title: string
          user_id: number
        }
        Update: {
          admin_replied_at?: string | null
          admin_reply?: string | null
          body?: string
          category?: string
          created_at?: string
          email?: string | null
          id?: never
          image_url?: string | null
          is_processed?: boolean
          title?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "inquiry_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mission_completions: {
        Row: {
          completed_at: string
          id: string
          mission_id: string
          period_key: string
          user_id: number
        }
        Insert: {
          completed_at?: string
          id?: string
          mission_id: string
          period_key: string
          user_id: number
        }
        Update: {
          completed_at?: string
          id?: string
          mission_id?: string
          period_key?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "mission_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notices: {
        Row: {
          body_en: string | null
          body_ko: string | null
          created_at: string | null
          expires_at: string | null
          id: number
          router_link: string | null
          title_en: string | null
          title_ko: string
        }
        Insert: {
          body_en?: string | null
          body_ko?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: number
          router_link?: string | null
          title_en?: string | null
          title_ko: string
        }
        Update: {
          body_en?: string | null
          body_ko?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: number
          router_link?: string | null
          title_en?: string | null
          title_ko?: string
        }
        Relationships: []
      }
      partner_customers: {
        Row: {
          created_at: string | null
          id: number
          partner_id: number
          user_id: number
        }
        Insert: {
          created_at?: string | null
          id?: never
          partner_id: number
          user_id: number
        }
        Update: {
          created_at?: string | null
          id?: never
          partner_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "partner_customers_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_customers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          address1: string | null
          address2: string | null
          category: Database["public"]["Enums"]["partner_category"]
          city: string | null
          country: string | null
          created_at: string
          description: string | null
          email: string
          id: number
          instagram_url: string | null
          name: string
          password: string
          phone: string | null
          profile_image_urls: Json | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          address1?: string | null
          address2?: string | null
          category: Database["public"]["Enums"]["partner_category"]
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          email: string
          id?: never
          instagram_url?: string | null
          name: string
          password: string
          phone?: string | null
          profile_image_urls?: Json | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          address1?: string | null
          address2?: string | null
          category?: Database["public"]["Enums"]["partner_category"]
          city?: string | null
          country?: string | null
          created_at?: string
          description?: string | null
          email?: string
          id?: never
          instagram_url?: string | null
          name?: string
          password?: string
          phone?: string | null
          profile_image_urls?: Json | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      pet_foods: {
        Row: {
          brand: string
          brand_en: string
          calories_per_100g: number | null
          created_at: string
          data: Json
          food_key: string
          id: string
          product_name: string
          product_name_en: string
          species: string
        }
        Insert: {
          brand?: string
          brand_en?: string
          calories_per_100g?: number | null
          created_at?: string
          data?: Json
          food_key: string
          id?: string
          product_name?: string
          product_name_en?: string
          species?: string
        }
        Update: {
          brand?: string
          brand_en?: string
          calories_per_100g?: number | null
          created_at?: string
          data?: Json
          food_key?: string
          id?: string
          product_name?: string
          product_name_en?: string
          species?: string
        }
        Relationships: []
      }
      pet_profiles: {
        Row: {
          birth_date: string
          breed: string
          country_code: string | null
          created_at: string
          food_amount_g: number
          food_brand: string
          food_cal_per_100g: number
          gender: string
          home_latitude: number | null
          home_longitude: number | null
          id: number
          name: string
          owner_name: string
          personality_description: string
          personality_tags: string
          species: string
          updated_at: string
          user_id: number
          weight_kg: number
        }
        Insert: {
          birth_date?: string
          breed?: string
          country_code?: string | null
          created_at?: string
          food_amount_g?: number
          food_brand?: string
          food_cal_per_100g?: number
          gender?: string
          home_latitude?: number | null
          home_longitude?: number | null
          id?: number
          name: string
          owner_name?: string
          personality_description?: string
          personality_tags?: string
          species?: string
          updated_at?: string
          user_id: number
          weight_kg?: number
        }
        Update: {
          birth_date?: string
          breed?: string
          country_code?: string | null
          created_at?: string
          food_amount_g?: number
          food_brand?: string
          food_cal_per_100g?: number
          gender?: string
          home_latitude?: number | null
          home_longitude?: number | null
          id?: number
          name?: string
          owner_name?: string
          personality_description?: string
          personality_tags?: string
          species?: string
          updated_at?: string
          user_id?: number
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "pet_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      point_transactions: {
        Row: {
          amount: number
          balance_after: number
          created_at: string
          id: number
          reason: string
          reference_id: string | null
          type: string
          user_id: number
        }
        Insert: {
          amount: number
          balance_after: number
          created_at?: string
          id?: never
          reason: string
          reference_id?: string | null
          type: string
          user_id: number
        }
        Update: {
          amount?: number
          balance_after?: number
          created_at?: string
          id?: never
          reason?: string
          reference_id?: string | null
          type?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "point_transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stool_analyses: {
        Row: {
          abnormalities: Json
          animal_type: string | null
          color: string | null
          color_assessment: string | null
          color_assessment_en: string | null
          concerns: Json
          concerns_en: Json | null
          consistency: string | null
          consistency_assessment: string | null
          consistency_assessment_en: string | null
          created_at: string
          has_blood: boolean | null
          has_foreign_objects: boolean | null
          has_mucus: boolean | null
          health_score: number | null
          health_summary: string | null
          health_summary_en: string | null
          id: string
          image_storage_path: string | null
          image_url: string | null
          raw_ai_response: Json | null
          recommendations: Json
          recommendations_en: Json | null
          shape: string | null
          size: string | null
          updated_at: string
          urgency_level: string | null
        }
        Insert: {
          abnormalities?: Json
          animal_type?: string | null
          color?: string | null
          color_assessment?: string | null
          color_assessment_en?: string | null
          concerns?: Json
          concerns_en?: Json | null
          consistency?: string | null
          consistency_assessment?: string | null
          consistency_assessment_en?: string | null
          created_at?: string
          has_blood?: boolean | null
          has_foreign_objects?: boolean | null
          has_mucus?: boolean | null
          health_score?: number | null
          health_summary?: string | null
          health_summary_en?: string | null
          id?: string
          image_storage_path?: string | null
          image_url?: string | null
          raw_ai_response?: Json | null
          recommendations?: Json
          recommendations_en?: Json | null
          shape?: string | null
          size?: string | null
          updated_at?: string
          urgency_level?: string | null
        }
        Update: {
          abnormalities?: Json
          animal_type?: string | null
          color?: string | null
          color_assessment?: string | null
          color_assessment_en?: string | null
          concerns?: Json
          concerns_en?: Json | null
          consistency?: string | null
          consistency_assessment?: string | null
          consistency_assessment_en?: string | null
          created_at?: string
          has_blood?: boolean | null
          has_foreign_objects?: boolean | null
          has_mucus?: boolean | null
          health_score?: number | null
          health_summary?: string | null
          health_summary_en?: string | null
          id?: string
          image_storage_path?: string | null
          image_url?: string | null
          raw_ai_response?: Json | null
          recommendations?: Json
          recommendations_en?: Json | null
          shape?: string | null
          size?: string | null
          updated_at?: string
          urgency_level?: string | null
        }
        Relationships: []
      }
      streak_check_ins: {
        Row: {
          check_in_date: string
          created_at: string
          id: number
          streak_count: number
          user_id: number
        }
        Insert: {
          check_in_date?: string
          created_at?: string
          id?: never
          streak_count?: number
          user_id: number
        }
        Update: {
          check_in_date?: string
          created_at?: string
          id?: never
          streak_count?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "streak_check_ins_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_checkup_records: {
        Row: {
          checkup_date: string
          created_at: string
          description: string | null
          id: number
          image_urls: Json | null
          partner_id: number | null
          partner_name: string | null
          pet_profile_id: number | null
          user_id: number
        }
        Insert: {
          checkup_date: string
          created_at?: string
          description?: string | null
          id?: never
          image_urls?: Json | null
          partner_id?: number | null
          partner_name?: string | null
          pet_profile_id?: number | null
          user_id: number
        }
        Update: {
          checkup_date?: string
          created_at?: string
          description?: string | null
          id?: never
          image_urls?: Json | null
          partner_id?: number | null
          partner_name?: string | null
          pet_profile_id?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_checkup_pet_profile"
            columns: ["pet_profile_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_checkup_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_food_records: {
        Row: {
          analysis: Json | null
          created_at: string
          food_items: Json
          id: number
          image_url: string | null
          memo: string | null
          pet_comment: string | null
          pet_comment_en: string | null
          pet_profile_id: number | null
          record_date: string
          registration_type: string
          total_amount_g: number
          total_calories: number
          user_id: number
        }
        Insert: {
          analysis?: Json | null
          created_at?: string
          food_items?: Json
          id?: never
          image_url?: string | null
          memo?: string | null
          pet_comment?: string | null
          pet_comment_en?: string | null
          pet_profile_id?: number | null
          record_date: string
          registration_type: string
          total_amount_g?: number
          total_calories?: number
          user_id: number
        }
        Update: {
          analysis?: Json | null
          created_at?: string
          food_items?: Json
          id?: never
          image_url?: string | null
          memo?: string | null
          pet_comment?: string | null
          pet_comment_en?: string | null
          pet_profile_id?: number | null
          record_date?: string
          registration_type?: string
          total_amount_g?: number
          total_calories?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_food_pet_profile"
            columns: ["pet_profile_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_food_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_grooming_records: {
        Row: {
          created_at: string
          description: string | null
          grooming_date: string
          id: number
          image_urls: Json | null
          partner_id: number | null
          partner_name: string | null
          pet_profile_id: number | null
          user_id: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          grooming_date: string
          id?: never
          image_urls?: Json | null
          partner_id?: number | null
          partner_name?: string | null
          pet_profile_id?: number | null
          user_id: number
        }
        Update: {
          created_at?: string
          description?: string | null
          grooming_date?: string
          id?: never
          image_urls?: Json | null
          partner_id?: number | null
          partner_name?: string | null
          pet_profile_id?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_grooming_pet_profile"
            columns: ["pet_profile_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_grooming_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_inventory: {
        Row: {
          created_at: string
          id: number
          item_id: string
          quantity: number
          updated_at: string
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: never
          item_id: string
          quantity?: number
          updated_at?: string
          user_id: number
        }
        Update: {
          created_at?: string
          id?: never
          item_id?: string
          quantity?: number
          updated_at?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_inventory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_mails: {
        Row: {
          body_en: string
          body_ko: string
          claimed_at: string | null
          created_at: string
          expires_at: string | null
          id: number
          is_claimed: boolean
          rewards: Json
          title_en: string
          title_ko: string
          user_id: number
        }
        Insert: {
          body_en?: string
          body_ko?: string
          claimed_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: never
          is_claimed?: boolean
          rewards?: Json
          title_en?: string
          title_ko: string
          user_id: number
        }
        Update: {
          body_en?: string
          body_ko?: string
          claimed_at?: string | null
          created_at?: string
          expires_at?: string | null
          id?: never
          is_claimed?: boolean
          rewards?: Json
          title_en?: string
          title_ko?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_mails_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_poop_bag_records: {
        Row: {
          created_at: string
          id: number
          image_url: string | null
          pet_profile_id: number | null
          record_date: string
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: never
          image_url?: string | null
          pet_profile_id?: number | null
          record_date?: string
          user_id: number
        }
        Update: {
          created_at?: string
          id?: never
          image_url?: string | null
          pet_profile_id?: number | null
          record_date?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_poop_bag_records_pet_profile_id_fkey"
            columns: ["pet_profile_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_poop_bag_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stool_records: {
        Row: {
          analysis: Json | null
          color: string | null
          consistency: string | null
          created_at: string
          has_blood: boolean
          has_mucus: boolean
          health_score: number | null
          health_summary: string | null
          health_summary_en: string | null
          id: number
          image_url: string | null
          pet_profile_id: number | null
          record_date: string
          shape: string | null
          size: string | null
          urgency_level: string | null
          user_id: number
        }
        Insert: {
          analysis?: Json | null
          color?: string | null
          consistency?: string | null
          created_at?: string
          has_blood?: boolean
          has_mucus?: boolean
          health_score?: number | null
          health_summary?: string | null
          health_summary_en?: string | null
          id?: never
          image_url?: string | null
          pet_profile_id?: number | null
          record_date: string
          shape?: string | null
          size?: string | null
          urgency_level?: string | null
          user_id: number
        }
        Update: {
          analysis?: Json | null
          color?: string | null
          consistency?: string | null
          created_at?: string
          has_blood?: boolean
          has_mucus?: boolean
          health_score?: number | null
          health_summary?: string | null
          health_summary_en?: string | null
          id?: never
          image_url?: string | null
          pet_profile_id?: number | null
          record_date?: string
          shape?: string | null
          size?: string | null
          urgency_level?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_stool_pet_profile"
            columns: ["pet_profile_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_stool_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_walk_records: {
        Row: {
          created_at: string
          distance_meters: number
          duration_seconds: number
          ended_at: string
          id: number
          image_urls: Json | null
          memo: string | null
          partner_id: number | null
          partner_name: string | null
          pet_comment: string | null
          pet_comment_en: string | null
          pet_profile_id: number | null
          route_coordinates: Json | null
          started_at: string
          steps: number
          user_id: number
        }
        Insert: {
          created_at?: string
          distance_meters?: number
          duration_seconds?: number
          ended_at: string
          id?: never
          image_urls?: Json | null
          memo?: string | null
          partner_id?: number | null
          partner_name?: string | null
          pet_comment?: string | null
          pet_comment_en?: string | null
          pet_profile_id?: number | null
          route_coordinates?: Json | null
          started_at: string
          steps?: number
          user_id: number
        }
        Update: {
          created_at?: string
          distance_meters?: number
          duration_seconds?: number
          ended_at?: string
          id?: never
          image_urls?: Json | null
          memo?: string | null
          partner_id?: number | null
          partner_name?: string | null
          pet_comment?: string | null
          pet_comment_en?: string | null
          pet_profile_id?: number | null
          route_coordinates?: Json | null
          started_at?: string
          steps?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_walk_pet_profile"
            columns: ["pet_profile_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_walk_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_weight_records: {
        Row: {
          created_at: string
          id: number
          pet_profile_id: number | null
          record_date: string
          user_id: number
          weight_kg: number
        }
        Insert: {
          created_at?: string
          id?: never
          pet_profile_id?: number | null
          record_date: string
          user_id: number
          weight_kg: number
        }
        Update: {
          created_at?: string
          id?: never
          pet_profile_id?: number | null
          record_date?: string
          user_id?: number
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_weight_pet_profile"
            columns: ["pet_profile_id"]
            isOneToOne: false
            referencedRelation: "pet_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_weight_records_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          country_code: string | null
          created_at: string
          email: string | null
          home_latitude: number | null
          home_longitude: number | null
          id: number
          is_admin: boolean
          membership_expires_at: string | null
          name: string | null
          nickname: string | null
          phone: string | null
          providers: string | null
          status: string
          streak_current: number
          streak_last_date: string | null
          streak_longest: number
          total_exp: number
          total_gems: number
          total_points: number
          uid: string
          updated_at: string
          user_name: string
        }
        Insert: {
          country_code?: string | null
          created_at?: string
          email?: string | null
          home_latitude?: number | null
          home_longitude?: number | null
          id?: never
          is_admin?: boolean
          membership_expires_at?: string | null
          name?: string | null
          nickname?: string | null
          phone?: string | null
          providers?: string | null
          status?: string
          streak_current?: number
          streak_last_date?: string | null
          streak_longest?: number
          total_exp?: number
          total_gems?: number
          total_points?: number
          uid: string
          updated_at?: string
          user_name?: string
        }
        Update: {
          country_code?: string | null
          created_at?: string
          email?: string | null
          home_latitude?: number | null
          home_longitude?: number | null
          id?: never
          is_admin?: boolean
          membership_expires_at?: string | null
          name?: string | null
          nickname?: string | null
          phone?: string | null
          providers?: string | null
          status?: string
          streak_current?: number
          streak_last_date?: string | null
          streak_longest?: number
          total_exp?: number
          total_gems?: number
          total_points?: number
          uid?: string
          updated_at?: string
          user_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      activate_membership: { Args: { p_days?: number }; Returns: Json }
      add_exp: { Args: { p_amount: number; p_reason?: string }; Returns: Json }
      add_gems: {
        Args: { p_amount: number; p_reason: string; p_reference_id?: string }
        Returns: Json
      }
      add_points: {
        Args: { p_amount: number; p_reason: string; p_reference_id?: string }
        Returns: Json
      }
      add_reward: {
        Args: {
          p_exp: number
          p_points: number
          p_reason: string
          p_reference_id?: string
        }
        Returns: Json
      }
      check_deleted_account: {
        Args: { p_provider: string; p_provider_id: string }
        Returns: Json
      }
      claim_mail: { Args: { p_mail_id: number }; Returns: Json }
      current_user_id: { Args: never; Returns: number }
      fetch_user_stats: { Args: never; Returns: Json }
      migrate_local_stats: {
        Args: { p_exp: number; p_gems: number; p_points: number }
        Returns: Json
      }
      register_partner_customer: {
        Args: { p_partner_id: number }
        Returns: Json
      }
      set_membership_expiry: { Args: { p_expires_at: string }; Returns: Json }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      spend_gems: {
        Args: { p_amount: number; p_reason: string; p_reference_id?: string }
        Returns: Json
      }
      spend_points: {
        Args: { p_amount: number; p_reason: string; p_reference_id?: string }
        Returns: Json
      }
    }
    Enums: {
      partner_category: "동물미용" | "동물병원" | "동물호텔" | "용품판매점"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      partner_category: ["동물미용", "동물병원", "동물호텔", "용품판매점"],
    },
  },
} as const
