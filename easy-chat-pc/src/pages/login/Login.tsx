import { Segmented } from "antd";
import { useState } from "react";
import styles from './Login.module.less'
import { SignType } from '../../../../easy-chat-common'
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    loginType?:string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values:FieldType) => {
    if(values.loginType === SignType.PassWord){
        console.log(values,'账号密码登录')
    }else{
        console.log(values,'手机号登录')
    }
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const segments = [{
    label: '手机验证码登录',
    value: SignType.MessageCode
}, {
    label: '账号密码登录',
    value: SignType.PassWord
}]
const Login = () => {
    const [signType, setSignType] = useState(SignType.PassWord);
    const [rememberUser,serRemberUser] = useState(false);
    const [userName,setUserName] = useState('')
    const [password,setPassWord] = useState('')
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
                    name="loginType">
                    <Segmented className={styles.loginType} options={segments} value={signType} onChange={value => setSignType(value)}>
                </Segmented>
                </Form.Item>
                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input placeholder="用户名" value={userName} onChange={e=>setUserName(e.target.value)}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password placeholder="密码" value={password} onChange={e=>setPassWord(e.target.value)}/>
                </Form.Item>

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                >
                 <Checkbox value={rememberUser} onChange={(e)=>serRemberUser(e.target.checked)}>记住账号</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width:230}}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}

export default Login;