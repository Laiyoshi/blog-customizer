import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
	isActive: boolean;
	onClick: () => void;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const { isActive, onClick } = props;
	return (
		<div
			onClick={() => onClick()}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isActive && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isActive && styles.arrow_open)}
			/>
		</div>
	);
};
