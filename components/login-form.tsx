'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, Input, Typography, message } from 'antd';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({ email: z.string().email('Enter a valid email address'), password: z.string().min(8, 'Password must be at least 8 characters') });
type Values = z.infer<typeof schema>;

export function LoginForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: 'security.admin@example.test', password: 'ChangeMe!2026' } });
  const submit = async () => { messageApi.info('Authentication is provided by the backend API. Connect this screen to /auth/login to begin a session.'); };
  return <>{contextHolder}<Form layout="vertical" onFinish={handleSubmit(submit)}>
    <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}><Input autoComplete="email" {...register('email')} /></Form.Item>
    <Form.Item label="Password" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}><Input.Password autoComplete="current-password" {...register('password')} /></Form.Item>
    <Button type="primary" htmlType="submit" loading={isSubmitting} block>Continue securely</Button>
  </Form><Typography.Paragraph type="secondary" className="form-note">Demo account details are prefilled from the development seed.</Typography.Paragraph></>;
}
