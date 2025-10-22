// Profile Header Component

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Mail, Building2, Calendar, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

export function ProfileHeader() {
  const { t } = useTranslation(['users', 'common']);
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarUpload = () => {
    // TODO: Implement avatar upload
    setIsUploading(true);
    setTimeout(() => {
      toast.success(t('common:messages.profilePictureUpdated'));
      setIsUploading(false);
    }, 1000);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeVariant = (role: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      system_admin: 'destructive',
      industry_owner: 'default',
      administrator: 'secondary',
      supervisor: 'outline',
      worker: 'outline',
    };
    return variants[role] || 'default';
  };

  if (!user) return null;

  return (
    <Card className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="h-32 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />

      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-4">
          <div className="relative inline-block">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl bg-primary/10">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 rounded-full shadow-lg"
              onClick={handleAvatarUpload}
              disabled={isUploading}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-3">
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <Mail className="h-4 w-4" />
              {user.email}
            </p>
          </div>

          {/* Badges and Info */}
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant={getRoleBadgeVariant(user.role.toLowerCase())} className="gap-1">
              <Shield className="h-3 w-3" />
              {t(`role.${user.role.toLowerCase()}`)}
            </Badge>

            {user.industryId && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span>{user.industryId}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {t('details.joinedOn')}: {format(new Date(user.createdAt), 'MMM dd, yyyy')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
