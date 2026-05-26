import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/product/ProductCard'
import ProductFilter from '../components/product/ProductFilter'
import PageShell from '../components/ui/PageShell'
import Loader from '../components/ui/Loader'
import { useProductsInfinite } from '../hooks/useProducts'
import { useTranslation } from '../hooks/useTranslation'

export default function CatalogPage() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()

  const [category, setCategory] = useState('')
  const [search, setSearch] = useState('')
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(5000)
  const [ageMin, setAgeMin] = useState(0)
  const [ageMax, setAgeMax] = useState(18)
  const [sort, setSort] = useState('new')

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
  }, [searchParams])

  const filters = useMemo(
    () => ({
      category: category || undefined,
      search,
      priceMin,
      priceMax,
      ageMin,
      ageMax,
      sort,
    }),
    [category, search, priceMin, priceMax, ageMin, ageMax, sort]
  )

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useProductsInfinite(filters)

  const products = data?.pages.flatMap((p) => p.items) ?? []

  return (
    <PageShell title={t('catalog')}>
      <ProductFilter
        category={category}
        onCategoryChange={setCategory}
        search={search}
        onSearchChange={setSearch}
        priceMin={priceMin}
        priceMax={priceMax}
        onPriceMinChange={setPriceMin}
        onPriceMaxChange={setPriceMax}
        ageMin={ageMin}
        ageMax={ageMax}
        onAgeMinChange={setAgeMin}
        onAgeMaxChange={setAgeMax}
        sort={sort}
        onSortChange={setSort}
      />

      {isLoading ? (
        <Loader />
      ) : products.length === 0 ? (
        <p className="text-center text-gray-400 py-12">{t('empty')}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="w-full mt-4 py-3 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 active:scale-95"
            >
              {isFetchingNextPage ? t('loading') : t('loadMore')}
            </button>
          )}
        </>
      )}
    </PageShell>
  )
}
