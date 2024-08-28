import { Box, Chip, Divider, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { SearchNormal1 } from "iconsax-react";
import SearchItem from "./SearchItem";
import { useState } from "react";
import img from "../../assets/DefaultImage.png";

// دیتای فیک برای محصولات
const fakeProducts = [
  { id: "1", image: img, name: "محصول 1", amount: 25000, category: "1" },
  { id: "2", image: img, name: "محصول 2", amount: 45000, category: "2" },
  { id: "3", image: img, name: "محصول 3", amount: 75000, category: "1" },
  { id: "4", image: img, name: "محصول 4", amount: 32000, category: "3" },
  { id: "5", image: img, name: "محصول 5", amount: 52000, category: "2" },
  { id: "6", image: img, name: "محصول 6", amount: 66000, category: "3" },
  { id: "7", image: img, name: "محصول 7", amount: 72000, category: "1" },
  { id: "8", image: img, name: "محصول 8", amount: 85000, category: "2" },
  // محصولات بیشتر
];

// دیتای فیک برای دسته‌بندی‌ها
const categories = [
  { id: "1", name: "دسته 1" },
  { id: "2", name: "دسته 2" },
  { id: "3", name: "دسته 3" },
  // دسته‌های بیشتر
];

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((c) => c !== categoryId) // حذف دسته اگر انتخاب شده باشد
        : [...prevCategories, categoryId] // اضافه کردن دسته اگر انتخاب نشده باشد
    );
  };

  const filteredProducts = fakeProducts.filter(
    (product) =>
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      product.name.includes(searchValue)
  );

  return (
    <Box className="w-full px-8">
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: theme.palette.background.default,
          mb:3,
          pt:4
        }}
        className="space-y-4"
      >
        <TextField
          variant="outlined"
          component={Paper}
          className="max-h-full"
          sx={{
            borderRadius: "50px",
          }}
          fullWidth
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="جستجو کنید ..."
          InputProps={{
            style: {
              maxHeight: "48px",
              borderRadius: "50px",
              border: `1px solid ${theme.palette.primary.light}`,
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchNormal1 color={theme.palette.primary.light} />
              </InputAdornment>
            ),
          }}
        />
        <Box className="w-full overflow-auto flex gap-2">
          {categories.map((category) => (
            <Chip
              key={category.id}
              label={category.name}
              onClick={() => handleCategoryClick(category.id)}
              color={selectedCategories.includes(category.id) ? "primary" : "default"}
            />
          ))}
        </Box>
        <Divider />
      </Box>
      <Box className="h-full overflow-auto space-y-3" height={"100%"}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => <SearchItem key={item.id} item={item} />)
        ) : (
          <Typography>موردی یافت نشد</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
