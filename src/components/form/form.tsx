import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { IFormProps } from './types';

import styles from './form.module.css';
import clsx from 'clsx';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
// Используйте для проверки формата введённого имени
import { namePattern } from '../../utils/constants';
import { set } from 'cypress/types/lodash';

export const Form: FC<IFormProps> = ({ setMode, className }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [nameError, setNameError] = useState(false);
  const [nameErrorText, setNameErrorText] = useState('');
  const [passwordMatchErrorText, setPasswordMatchErrorText] = useState('');

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setPasswordMatchErrorText('Пароли не совпадают');
    } else {
      setPasswordMatchErrorText('');
      setMode('complete');
    }
  };
  useEffect(() => {
    if (!nameError && name && email && password && repeatPassword) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [name, email, password, repeatPassword, nameError]);
  const [disableButton, setDisableButton] = useState(true); // disableButton

  const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
    if (!namePattern.test(e.target.value) && e.target.value) {
      setNameError(true);
      setNameErrorText('Некорректный формат имени');
    } else {
      setNameError(false);
      setNameErrorText('');
    }
  };

  return (
    <form
      className={clsx(styles.form, className)}
      data-testid='form'
      onSubmit={onFormSubmit}
    >
      <div className={styles.icon} />
      <div className={styles.text_box}>
        <p className='text text_type_main-large'>Мы нуждаемся в вашей силе!</p>
        <p className={clsx(styles.text, 'text text_type_main-medium')}>
          Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
          контрибьюторов
        </p>
      </div>
      <fieldset className={styles.fieldset}>
        <Input
          placeholder='Имя'
          className='text input__textfield text_type_main-default'
          data-testid='name-input'
          name='name'
          onBlur={() => {}}
          onChange={(e) => onNameChange(e)}
          onFocus={() => {}}
          type='text'
          value={name}
          error={nameError}
          errorText={nameErrorText}
          required
        />
        <EmailInput
          placeholder='E-mail'
          className='text input__textfield text_type_main-default'
          data-testid='email-input'
          disabled={false}
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
        <PasswordInput
          placeholder='Пароль'
          className='text input__textfield text_type_main-default'
          data-testid='password-input'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <PasswordInput
          placeholder='Повторите пароль'
          className='text input__textfield text_type_main-default'
          data-testid='repeat-password-input'
          name='repeatPassword'
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatPassword}
          required
        />
        {passwordMatchErrorText && (
          <div className='input__error'>{passwordMatchErrorText}</div>
        )}

        <Button
          htmlType='submit'
          className='button button_type_primary button_size_medium'
          disabled={disableButton}
          type='secondary'
        >
          Зарегистрироваться
        </Button>
      </fieldset>
      <div className={styles.signin_box}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?
        </p>
        <Button
          htmlType='button'
          type='secondary'
          size='medium'
          extraClass={styles.signin_btn}
        >
          Войти
        </Button>
      </div>
    </form>
  );
};
