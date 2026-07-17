'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Typography, message } from 'antd';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuth } from '../lib/auth';

const schema = z.object({ email: z.string().email('Enter a valid email address'), password: z.string().min(8, 'Password must be at least 8 characters') });
type Values = z.infer<typeof schema>;

export function LoginForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const { session, signIn, signOut } = useAuth();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: 'security.admin@example.test', password: 'ChangeMe!2026' } });
  const submit = async (values: Values) => {
    try { await signIn(values); messageApi.success('Signed in securely.'); } catch (error) { messageApi.error(error instanceof Error ? error.message : 'Sign-in failed'); }
  };
  const handleSignOut = async () => { await signOut(); messageApi.success('Signed out securely.'); };

  if (session) return <>{contextHolder}<Typography.Paragraph>You are signed in to the management plane.</Typography.Paragraph><Button danger onClick={handleSignOut} block>Sign out</Button></>;
  return <>{contextHolder}<Form layout="vertical" onFinish={handleSubmit(submit)}>
    <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}><Input autoComplete="email" {...register('email')} /></Form.Item>
    <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}><Input.Password autoComplete="current-password" {...register('password')} /></Form.Item>
    <Button type="primary" htmlType="submit" loading={isSubmitting} block>Continue securely</Button>
  </Form><Typography.Paragraph type="secondary" className="form-note">Demo account details are prefilled from the development seed.</Typography.Paragraph></>;
}
