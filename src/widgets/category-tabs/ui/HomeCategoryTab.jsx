import { CategoryTab } from '@entities/category/ui/CategoryTab';
import { CATEGORIES } from '@entities/category/data/categories';
import { HomeCategoryWrapper } from './styles';

export const HomeCategoryTab = ({ activeCategory, onSelect }) => {
  return (
    <HomeCategoryWrapper>
      {CATEGORIES.filter(category => category.value !== null).map(category => (
        <CategoryTab
          key={category.value}
          label={category.label}
          isActive={activeCategory === category.value}
          onClick={() => onSelect(category.value)}
        />
      ))}
    </HomeCategoryWrapper>
  );
};
