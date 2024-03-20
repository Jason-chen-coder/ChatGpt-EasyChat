import { Segmented } from "antd";
import { useState } from "react";
import styles from './Login.module.less'
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};
const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
enum LoginType {
    PassWord,
    MessageCode
}
const segments = [{
    label: '手机验证码登录',
    value: LoginType.MessageCode
}, {
    label: '账号密码登录',
    value: LoginType.PassWord
}]
const Login = () => {
    const [loginType, setLoginType] = useState(LoginType.PassWord);
    return <div className="loginWrapper">
        <div className={styles.loginType}>
            <Segmented options={segments} value={loginType} onChange={value => setLoginType(value)}>
            </Segmented>
        </div>
        <div>
            <Form
                name="basic"
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>记住账号</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" width={100}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}

export default Login;