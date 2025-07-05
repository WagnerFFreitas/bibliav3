
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Mail } from 'lucide-react';
import AuthModal from './AuthModal';

const UserProfile: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowAuthModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <User className="w-4 h-4 mr-2" />
          Entrar
        </Button>
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  const userInitials = user.user_metadata?.full_name
    ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <Card className="w-full bg-white border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-gray-700 text-sm">
          <User className="w-4 h-4" />
          Meu Perfil
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-blue-100 text-blue-700">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <p className="font-medium text-sm text-gray-800">
              {user.user_metadata?.full_name || 'Usuário'}
            </p>
            <p className="text-xs text-gray-600 flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {user.email}
            </p>
          </div>
        </div>
        
        <Button
          onClick={signOut}
          variant="outline"
          size="sm"
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="w-3 h-3 mr-2" />
          Sair
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
