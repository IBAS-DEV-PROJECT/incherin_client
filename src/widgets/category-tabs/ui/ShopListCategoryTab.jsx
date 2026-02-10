import { CategoryTab } from '@entities/category/ui/CategoryTab';
import { CATEGORIES } from '@entities/category/data/categories';
import { ShopListCategoryGrid } from './styles';

export const ShopListCategoryTab = ({ activeCategory, onSelect }) => {
  return (
    <>
      <ShopListCategoryGrid>
        {CATEGORIES.map(category => (
          <CategoryTab
            key={category.value ?? 'all'}
            label={category.label}
            isActive={activeCategory === category.value}
            onClick={() => onSelect(category.value)}
          />
        ))}
      </ShopListCategoryGrid>
    </>
  );
};
