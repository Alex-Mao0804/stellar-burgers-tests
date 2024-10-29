import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
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

export const Form: FC<IFormProps> = ({ setMode, className }) => (
  <form className={clsx(styles.form, className)} data-testid='form'>
    <div className={styles.icon} />
    <div className={styles.text_box}>
      <p className='text text_type_main-large'>Мы нуждаемся в вашей силе!</p>
      <p className={clsx(styles.text, 'text text_type_main-medium')}>
        Зарегистрируйтесь на нашей платформе, чтобы присоединиться к списку
        контрибьюторов
      </p>
    </div>
    <fieldset className={styles.fieldset}>{/* Ваш код здесь */}</fieldset>
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
