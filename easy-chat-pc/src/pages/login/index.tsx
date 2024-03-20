import styles from './index.module.less'
import loginBackgroundVideo from '../../assets/videos/loginBgVideo.mp4';
import Login from './Login';
import Register from './Register';
import { useState } from 'react';
import { Button } from 'antd';
enum OperateType {
  Register,
  Login
}
const LoginPage = () => {
  const [operateType, setOperateType] = useState(OperateType.Login)
  const isLogin = operateType === OperateType.Login;
  return <div className={styles.loginPage}>
    <div className={styles.bgVideoWrapper}>
      <video src={loginBackgroundVideo} autoPlay muted playsInline loop crossOrigin="anonymous"></video>
    </div>
    <div className={styles.loginFormWarpper}>
      <div className={styles.loginFormTitleWrapper}>
        <h3 className={styles.loginFormTitleWrapperTile}>{isLogin?'登录':'注册'}您的Easy账户</h3>
        {isLogin ?'已':'没'}有账户?
        <Button type='link' onClick={() => setOperateType(isLogin?OperateType.Register:OperateType.Login)}>{isLogin ? '免费注册':'前去登录'}</Button>
      </div>
      {
        operateType == OperateType.Login ? <Login /> : <Register />
      }
    </div>
  </div>
}
export default LoginPage;