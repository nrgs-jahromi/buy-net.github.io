import { Box, Chip, Divider, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import theme from "../../theme";
import { SearchNormal1 } from "iconsax-react";
import SearchItem from "./SearchItem";
import { useEffect, useState } from "react";
import { useCategories } from "../../api/product/getCategories";
import { useProducts } from "../../api/product/getProductsList";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const store_id = "CTBYR9LM";

  const { data: categories = [], isLoading: isCategoriesLoading, error: categoriesError } = useCategories(store_id);

  const { data: productsData, isLoading: isProductsLoading, error: productsError } = useProducts(
    { store_id, params: { q: searchValue } }
  );

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryId)
        ? prevCategories.filter((c) => c !== categoryId)
        : [...prevCategories, categoryId]
    );
  };

  useEffect(()=>{
    console.log("selectedCategories" , selectedCategories);
    
  },[selectedCategories])
  // Check if productsData and productsData.results are defined before filtering
  const selectedCategoryNames = categories
  .filter(category => selectedCategories.includes(String(category.id)))
  .map(category => category.name);

const filteredProducts = productsData?.filter(
  (product) =>
    (selectedCategoryNames.length === 0 || 
     product.category_names?.some(categoryName => selectedCategoryNames.includes(categoryName))) &&
    product.name.includes(searchValue)
) || [];

  console.log("filteredProducts" , filteredProducts);
  
  return (
    <Box className="w-full px-8">
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          backgroundColor: theme.palette.background.default,
          mb: 3,
          pt: 4,
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
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchNormal1 color={theme.palette.primary.light} />
              </InputAdornment>
            ),
          }}
        />
        <Box className="w-full overflow-auto flex gap-2">
          {isCategoriesLoading ? (
            <Typography>در حال بارگذاری...</Typography>
          ) : categoriesError ? (
            <Typography>خطایی رخ داد</Typography>
          ) : (
            categories.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                onClick={() => handleCategoryClick(String(category.id))}
                color={selectedCategories.includes(String(category.id)) ? "primary" : "default"}
              />
            ))
          )}
        </Box>
        <Divider />
      </Box>
      <Box className="h-full overflow-auto space-y-3 " height={"100%"}>
        {isProductsLoading ? (
          <Typography>در حال بارگذاری محصولات...</Typography>
        ) : productsError ? (
          <Typography>خطایی رخ داد</Typography>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((item) => <SearchItem  item={item} />)
        ) : (
          <Typography>موردی یافت نشد</Typography>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
