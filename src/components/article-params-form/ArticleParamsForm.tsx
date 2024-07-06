import { useState, FormEvent } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Separator } from '../separator';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	fontFamilyOptions,
	contentWidthArr,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group/RadioGroup';

export type ArticleFormProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleFormProps) => {
	const { setArticleState } = props;

	const [isOpened, setIsOpened] = useState<boolean>(false);
	const [isSelect, setIsSelect] =
		useState<ArticleStateType>(defaultArticleState);

	const asideStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpened,
	});

	const overlayStyle = clsx({
		[styles.overlay]: true,
		[styles.overlay_open]: isOpened,
	});

	function handleChange(selectValue: string) {
		return (value: OptionType) => {
			setIsSelect((currentFormState: ArticleStateType) => ({
				...currentFormState,
				[selectValue]: value,
			}));
		};
	}

	function handleReset(evt: FormEvent<HTMLFormElement>): void {
		evt.preventDefault();
		setIsSelect(defaultArticleState);
	}

	function handleSubmit(evt: FormEvent<HTMLFormElement>): void {
		evt.preventDefault();
		setArticleState(isSelect);
	}

	return (
		<>
			<ArrowButton
				isActive={isOpened}
				onClick={() =>
					setIsOpened((currentIsOpened: boolean) => !currentIsOpened)
				}
			/>
			<div onClick={() => setIsOpened(false)} className={overlayStyle}></div>
			<aside className={asideStyle}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={isSelect.fontFamilyOption}
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						selected={isSelect.fontSizeOption}
						name='radio'
						onChange={handleChange('fontSizeOption')}
						options={fontSizeOptions}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={isSelect.fontColor}
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={isSelect.backgroundColor}
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={isSelect.contentWidth}
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
