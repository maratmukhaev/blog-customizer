import { SyntheticEvent, useState, useRef } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: (data: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedArticleState, setSelectedArticleState] =
		useState<ArticleStateType>(articleState);
	const modalRef = useRef<HTMLElement>(null);

	const handleChangeSelectedState = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectedArticleState({ ...selectedArticleState, [key]: value });
	};

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState(selectedArticleState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setSelectedArticleState(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen,
		rootRef: modalRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={modalRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={selectedArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(options) =>
							handleChangeSelectedState('fontFamilyOption', options)
						}
					/>
					<RadioGroup
						selected={selectedArticleState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						name='fonts'
						onChange={(options) =>
							handleChangeSelectedState('fontSizeOption', options)
						}
					/>
					<Select
						selected={selectedArticleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(options) =>
							handleChangeSelectedState('fontColor', options)
						}
					/>
					<Separator />
					<Select
						selected={selectedArticleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(options) =>
							handleChangeSelectedState('backgroundColor', options)
						}
					/>
					<Select
						selected={selectedArticleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(options) =>
							handleChangeSelectedState('contentWidth', options)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
