import { prisma } from "../prisma/client";
import { createServerSupabaseClient } from "../supabase/server";

export const authServer = {
  async validateCredentials(email: string, password: string) {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase sign-in error:', error.message);
      throw new Error('Invalid login credentials');
    }

    return {
      user: data.user,
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
    };
  },

  async createUser(email: string, password: string, name?: string) {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    });

    if (error) {
      console.error('Supabase user creation error:', error.message);
      throw new Error('Failed to create Supabase user');
    }

    if (!data.user || !data.user.id || !data.user.email) {
      throw new Error('Invalid user data returned from Supabase');
    }

    const user = await prisma.user.create({
      data: {
        supabaseId: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata?.name || null,
      },
    });

    return user;
  },
};