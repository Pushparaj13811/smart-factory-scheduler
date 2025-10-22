// Security Tab Component

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  Key,
  Smartphone,
  Lock,
  AlertTriangle,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';
import { toast } from 'sonner';

export function SecurityTab() {
  const { t } = useTranslation(['common', 'profile']);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error(t('messages.passwordMismatch'));
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      toast.error(t('profile:security.passwordRequirements'));
      return;
    }

    // TODO: Implement API call
    toast.success(t('messages.passwordChanged'));
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsChangingPassword(false);
  };

  const handleToggle2FA = () => {
    if (!twoFactorEnabled) {
      // TODO: Show 2FA setup modal/dialog
      toast.success(t('profile:security.twoFactorEnabled'));
      setTwoFactorEnabled(true);
    } else {
      // TODO: Show confirmation dialog
      toast.success(t('profile:security.twoFactorDisabled'));
      setTwoFactorEnabled(false);
    }
  };

  const getPasswordStrength = (password: string): { strength: number; label: string; color: string } => {
    if (password.length === 0) return { strength: 0, label: '', color: '' };
    if (password.length < 8) return { strength: 25, label: t('profile:security.weak'), color: 'bg-red-500' };

    let strength = 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;

    if (strength < 50) return { strength, label: t('profile:security.weak'), color: 'bg-red-500' };
    if (strength < 75) return { strength, label: t('profile:security.medium'), color: 'bg-yellow-500' };
    return { strength, label: t('profile:security.strong'), color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(passwordForm.newPassword);

  return (
    <div className="space-y-6">
      {/* Password Change */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            {t('messages.changePassword')}
          </CardTitle>
          <CardDescription>{t('profile:security.passwordDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isChangingPassword ? (
            <Button onClick={() => setIsChangingPassword(true)}>
              <Lock className="mr-2 h-4 w-4" />
              {t('messages.changePassword')}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{t('messages.currentPassword')}</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword.current ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                    }
                    placeholder={t('messages.enterCurrentPassword')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() =>
                      setShowPassword({ ...showPassword, current: !showPassword.current })
                    }
                  >
                    {showPassword.current ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">{t('messages.newPassword')}</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPassword.new ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                    }
                    placeholder={t('profile:security.newPasswordPlaceholder')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() =>
                      setShowPassword({ ...showPassword, new: !showPassword.new })
                    }
                  >
                    {showPassword.new ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Password Strength Indicator */}
                {passwordForm.newPassword && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{t('profile:security.passwordStrength')}:</span>
                      <span className="font-medium">{passwordStrength.label}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>{t('profile:security.passwordRequirements')}:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>{t('profile:security.requirement1')}</li>
                    <li>{t('profile:security.requirement2')}</li>
                    <li>{t('profile:security.requirement3')}</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('users:form.confirmPassword')}</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPassword.confirm ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                    }
                    placeholder={t('users:form.confirmPasswordPlaceholder')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() =>
                      setShowPassword({ ...showPassword, confirm: !showPassword.confirm })
                    }
                  >
                    {showPassword.confirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsChangingPassword(false);
                    setPasswordForm({
                      currentPassword: '',
                      newPassword: '',
                      confirmPassword: '',
                    });
                  }}
                >
                  {t('actions.cancel')}
                </Button>
                <Button onClick={handlePasswordChange}>{t('actions.save')}</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {t('profile:security.twoFactorAuth')}
          </CardTitle>
          <CardDescription>{t('profile:security.twoFactorDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">{t('profile:security.authenticatorApp')}</div>
              <div className="text-sm text-muted-foreground">
                {t('profile:security.authenticatorDescription')}
              </div>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
          </div>

          {twoFactorEnabled && (
            <Alert className="bg-green-500/10 border-green-500/20">
              <Check className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-700 dark:text-green-400">
                {t('profile:security.twoFactorActive')}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Security Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            {t('profile:security.recommendations')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {t('profile:security.recommendationText')}
            </AlertDescription>
          </Alert>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5" />
              <span>{t('profile:security.tip1')}</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5" />
              <span>{t('profile:security.tip2')}</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5" />
              <span>{t('profile:security.tip3')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
