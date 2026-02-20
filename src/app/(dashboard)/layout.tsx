import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { AuthProvider } from '@/contexts/AuthContext';
import { ViewModeProvider } from '@/contexts/ViewModeContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  let defaultMode: 'consultant' | 'leadership' = 'consultant';
  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    defaultMode = profile?.role === 'politician' ? 'leadership' : 'consultant';
  } catch {
    // Default to consultant if profiles table not set up
  }

  return (
    <AuthProvider>
      <ViewModeProvider defaultMode={defaultMode}>
        <div className="min-h-screen bg-gray-50">
          <Sidebar />
          <div className="pl-64">
            <Header />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </ViewModeProvider>
    </AuthProvider>
  );
}
