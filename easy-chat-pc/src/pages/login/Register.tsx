import { SignUpType, SingUpData } from '../../../../easy-chat-common'
import { Segmented } from "antd";
import { useState } from "react";
import styles from './Login.module.less'
import { Button, Form, type FormProps, Input } from 'antd';
interface FieldType {
    phoneNumber?: string;
    email?: string;
    userName: string;
    password: string;
    signUpType: SignUpType;
    messageCode: string;
}

const segments = [{
    label: '手机注册',
    value: SignUpType.PhoneNumber
}, {
    label: '邮箱注册',
    value: SignUpType.Email
}]
enum Step {
    PhoneOrEmail = 'phoneOrEmail',
    MessageCode = 'messageCode',
    PassWord = 'passWord'
}
const Register = () => {
    const [signUpType, setSignUpType] = useState(SignUpType.PhoneNumber);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [messageCode, setMessageCode] = useState('')
    const [step, setStep] = useState(Step.PhoneOrEmail);

    const onFinish: FormProps<FieldType>["onFinish"] = (values: FieldType) => {
        const isUsePhone = values.signUpType === SignUpType.PhoneNumber;
        switch (step) {
            case Step.PhoneOrEmail:
                // 发送验证码
                if (isUsePhone) {
                    console.log('发送手机验证码')
                } else {
                    console.log('发送邮箱验证码')
                }
                setStep(Step.MessageCode)
                break;
            case Step.MessageCode:
                // 校验验证码
                setStep(Step.PassWord)
                break;
            case Step.PassWord:
                //提交
                break;
        }
    };

    const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const isUsePhone = signUpType == SignUpType.PhoneNumber;
    return <div className="loginWrapper">
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
                    name="signUpType">
                    <Segmented className={styles.loginType} options={segments} value={signUpType} onChange={value => setSignUpType(value)}>
                    </Segmented>
                </Form.Item>
                {(isUsePhone && step == Step.PhoneOrEmail) && <Form.Item<FieldType>
                    name="phoneNumber"
                    rules={[{ required: true, message: '请输入手机号!' }]}
                >
                    <Input placeholder="手机号" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                </Form.Item>}
                {(!isUsePhone && step == Step.PhoneOrEmail) && <Form.Item<FieldType>
                    name="email"
                    rules={[{ required: true, message: '请输入邮箱地址!' }]}
                >
                    <Input placeholder="邮箱地址" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Item>}
                {step == Step.MessageCode &&
                    <Form.Item<FieldType>
                        name="messageCode"
                        rules={[{ required: true, message: '请输入验证码!' }]}
                    >
                        <Input.Password placeholder="验证码" value={messageCode} onChange={e => setMessageCode(e.target.value)} />
                    </Form.Item>
                }
                {step == Step.PassWord &&
                    <>
                        <Form.Item<FieldType>
                            name="userName"
                            rules={[{ required: true, message: '请输入账户名称!' }]}
                        >
                            <Input placeholder="账户名称" value={userName} onChange={e => setUserName(e.target.value)} />
                        </Form.Item>
                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Item>
                    </>
                }
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: 230 }}>
                        {step == Step.PassWord ? '注册' : '下一步'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}

export default Register;