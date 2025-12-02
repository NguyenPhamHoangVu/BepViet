import React, { useMemo, useState } from 'react'
import {
  BookmarkPlus,
  ChefHat,
  Layers,
  ListPlus,
  Plus,
  Search,
  Tag,
  Timer,
  Trash2,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { dummyRecipeCollection } from '../assets/assets'

const FALLBACK_RECIPE_IMAGE =
  'https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg'

const categoryFilters = [
  { id: 'all', label: 'Tất cả' },
  { id: 'Ăn sáng', label: 'Ăn sáng' },
  { id: 'Món chính', label: 'Món chính' },
  { id: 'Món khai vị', label: 'Món khai vị' },
  { id: 'Ăn nhẹ', label: 'Ăn nhẹ' },
  { id: 'Tráng miệng', label: 'Tráng miệng' },
]

const difficultyOptions = ['Dễ', 'Trung bình', 'Khó']

const generateTempId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `draft-${Date.now()}-${Math.random().toString(16).slice(2)}`

const createEmptyRecipeDraft = () => ({
  tempId: generateTempId(),
  name: '',
  description: '',
  category: 'Món chính',
  difficulty: 'Dễ',
  image: '',
  tags: '',
  ingredients: [''],
  steps: [''],
  servings: 2,
  prepTime: 15,
  cookTime: 20,
})

const RecipeCollection = () => {
  const [recipes, setRecipes] = useState(dummyRecipeCollection)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [drafts, setDrafts] = useState([createEmptyRecipeDraft()])

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return recipes.filter((recipe) => {
      const matchesCategory =
        activeCategory === 'all' || recipe.category === activeCategory
      const matchesQuery =
        normalizedQuery.length === 0 ||
        recipe.name.toLowerCase().includes(normalizedQuery) ||
        recipe.tags?.some((tag) => tag.toLowerCase().includes(normalizedQuery))

      return matchesCategory && matchesQuery
    })
  }, [recipes, searchQuery, activeCategory])

  const totalRecipes = recipes.length
  const quickRecipes = recipes.filter(
    (recipe) => recipe.prepTime + recipe.cookTime <= 45,
  ).length
  const dessertIdeas = recipes.filter(
    (recipe) => recipe.category === 'Tráng miệng',
  ).length

  const handleDraftFieldChange = (tempId, field, value) => {
    setDrafts((prev) =>
      prev.map((draft) =>
        draft.tempId === tempId ? { ...draft, [field]: value } : draft,
      ),
    )
  }

  const handleDynamicFieldChange = (tempId, field, index, value) => {
    setDrafts((prev) =>
      prev.map((draft) => {
        if (draft.tempId !== tempId) return draft
        const updated = draft[field].map((item, idx) =>
          idx === index ? value : item,
        )
        return { ...draft, [field]: updated }
      }),
    )
  }

  const addDynamicField = (tempId, field) => {
    setDrafts((prev) =>
      prev.map((draft) =>
        draft.tempId === tempId
          ? { ...draft, [field]: [...draft[field], ''] }
          : draft,
      ),
    )
  }

  const removeDynamicField = (tempId, field, index) => {
    setDrafts((prev) =>
      prev.map((draft) => {
        if (draft.tempId !== tempId) return draft
        if (draft[field].length === 1) return draft
        return {
          ...draft,
          [field]: draft[field].filter((_, idx) => idx !== index),
        }
      }),
    )
  }

  const handleAddDraftForm = () => {
    setDrafts((prev) => [...prev, createEmptyRecipeDraft()])
  }

  const handleRemoveDraft = (tempId) => {
    setDrafts((prev) => {
      if (prev.length === 1) {
        return [createEmptyRecipeDraft()]
      }
      return prev.filter((draft) => draft.tempId !== tempId)
    })
  }

  const handleSaveDrafts = () => {
    let hasInvalidEntry = false

    const readyDrafts = drafts.filter(
      (draft) => draft.name.trim() && draft.description.trim(),
    )

    const normalizedDrafts = readyDrafts
      .map((draft) => {
        const ingredients = draft.ingredients
          .map((item) => item.trim())
          .filter(Boolean)
        const steps = draft.steps.map((item) => item.trim()).filter(Boolean)

        if (!ingredients.length || !steps.length) {
          hasInvalidEntry = true
          return null
        }

        return {
          _id: `recipe-${Date.now()}-${Math.random()
            .toString(16)
            .slice(2, 8)}`,
          name: draft.name.trim(),
          description: draft.description.trim(),
          category: draft.category,
          difficulty: draft.difficulty,
          image: draft.image.trim() || FALLBACK_RECIPE_IMAGE,
          tags: draft.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean),
          ingredients,
          steps,
          servings: Number(draft.servings) || 1,
          prepTime: Number(draft.prepTime) || 0,
          cookTime: Number(draft.cookTime) || 0,
          createdAt: new Date().toISOString(),
        }
      })
      .filter(Boolean)

    if (hasInvalidEntry) {
      toast.error('Mỗi công thức cần ít nhất 1 nguyên liệu và 1 bước thực hiện.')
      return
    }

    if (!normalizedDrafts.length) {
      toast.error('Vui lòng nhập tên và mô tả cho ít nhất một công thức.')
      return
    }

    setRecipes((prev) => [...normalizedDrafts, ...prev])
    setDrafts([createEmptyRecipeDraft()])
    toast.success(`Đã thêm ${normalizedDrafts.length} công thức vào bộ sưu tập.`)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
      <div className='max-w-6xl mx-auto p-6 space-y-8'>
        <header className='flex flex-col gap-4'>
          <div className='flex items-center gap-3 text-indigo-700'>
            <BookmarkPlus className='w-6 h-6' />
            <p className='text-sm font-semibold uppercase tracking-widest'>
              Bộ sưu tập công thức
            </p>
          </div>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-slate-900'>
              Lưu trữ & tìm kiếm món ăn bạn yêu thích
            </h1>
            <p className='text-slate-600 mt-2 max-w-3xl'>
              Thêm từng công thức hoặc lên kế hoạch cho nhiều món ăn cùng lúc,
              sau đó sử dụng thanh tìm kiếm để tìm lại món ăn chỉ trong vài
              giây.
            </p>
          </div>
        </header>

        <section className='grid gap-4 md:grid-cols-3'>
          <StatCard
            icon={Layers}
            label='Tổng công thức'
            value={totalRecipes}
            helper='Đang lưu trong bộ sưu tập'
          />
          <StatCard
            icon={Timer}
            label='Nấu nhanh ≤ 45p'
            value={quickRecipes}
            helper='Chuẩn bị + nấu'
          />
          <StatCard
            icon={ChefHat}
            label='Tráng miệng mát lạnh'
            value={dessertIdeas}
            helper='Sẵn sàng phục vụ'
          />
        </section>

        <section className='bg-white border border-slate-100 rounded-2xl shadow-sm p-5 space-y-4'>
          <div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5' />
              <input
                type='text'
                className='w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm'
                placeholder='Tìm theo tên hoặc hashtag món ăn...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='flex flex-wrap gap-2 text-sm'>
              {categoryFilters.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveCategory(id)}
                  className={`px-3.5 py-1.5 rounded-full border transition ${
                    activeCategory === id
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className='text-xs text-slate-500'>
            Nhập tên món như “phở bò” hoặc hashtag như “#ăn sáng, #healthy”.
          </p>
        </section>

        <section className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-slate-900'>
              Bộ sưu tập hiện có
            </h2>
            <span className='text-sm text-slate-500'>
              {filteredRecipes.length} công thức khớp tìm kiếm
            </span>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className='border border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-3 bg-white'>
              <p className='text-lg font-semibold text-slate-700'>
                Không tìm thấy công thức nào
              </p>
              <p className='text-sm text-slate-500 max-w-xl mx-auto'>
                Thử thay đổi từ khóa hoặc thêm công thức mới bên dưới để giữ bộ
                sưu tập luôn phong phú.
              </p>
            </div>
          ) : (
            <div className='grid gap-6 lg:grid-cols-2'>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          )}
        </section>

        <section className='bg-white border border-slate-100 rounded-2xl shadow-sm p-5 space-y-6'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center gap-2 text-indigo-700'>
              <ListPlus className='w-5 h-5' />
              <span className='text-sm font-semibold uppercase tracking-wide'>
                Thêm công thức mới
              </span>
            </div>
            <h2 className='text-2xl font-semibold text-slate-900'>
              Ghi lại từng món ăn hoặc lên danh sách nhiều món cùng lúc
            </h2>
            <p className='text-sm text-slate-500'>
              Điền thông tin tối thiểu (tên, mô tả, nguyên liệu, bước thực hiện)
              cho mỗi công thức. Bạn có thể tạo nhiều form và lưu chúng chỉ với
              một lần bấm.
            </p>
          </div>

          <div className='flex flex-wrap gap-3'>
            <button
              type='button'
              onClick={handleAddDraftForm}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 transition text-sm font-medium'
            >
              <Plus className='w-4 h-4' />
              Thêm form công thức
            </button>
            <button
              type='button'
              onClick={handleSaveDrafts}
              className='inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow hover:opacity-95 transition'
            >
              <BookmarkPlus className='w-4 h-4' />
              Lưu {drafts.length} công thức
            </button>
          </div>

          <div className='space-y-6'>
            {drafts.map((draft, idx) => (
              <div
                key={draft.tempId}
                className='border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm'
              >
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-semibold text-slate-600'>
                    Công thức #{idx + 1}
                  </p>
                  <button
                    type='button'
                    onClick={() => handleRemoveDraft(draft.tempId)}
                    className='text-slate-400 hover:text-rose-500 transition flex items-center gap-1 text-xs font-medium'
                  >
                    <Trash2 className='w-4 h-4' />
                    Gỡ form
                  </button>
                </div>

                <div className='grid gap-4 md:grid-cols-2'>
                  <FormField label='Tên công thức *'>
                    <input
                      type='text'
                      value={draft.name}
                      onChange={(e) =>
                        handleDraftFieldChange(draft.tempId, 'name', e.target.value)
                      }
                      className='form-input'
                      placeholder='Ví dụ: Bún bò Huế chuẩn vị'
                    />
                  </FormField>

                  <FormField label='Ảnh minh họa (URL)'>
                    <input
                      type='url'
                      value={draft.image}
                      onChange={(e) =>
                        handleDraftFieldChange(draft.tempId, 'image', e.target.value)
                      }
                      className='form-input'
                      placeholder='https://...'
                    />
                  </FormField>

                  <FormField label='Chuyên mục'>
                    <select
                      value={draft.category}
                      onChange={(e) =>
                        handleDraftFieldChange(
                          draft.tempId,
                          'category',
                          e.target.value,
                        )
                      }
                      className='form-input'
                    >
                      {categoryFilters
                        .filter((item) => item.id !== 'all')
                        .map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                    </select>
                  </FormField>

                  <FormField label='Độ khó'>
                    <select
                      value={draft.difficulty}
                      onChange={(e) =>
                        handleDraftFieldChange(
                          draft.tempId,
                          'difficulty',
                          e.target.value,
                        )
                      }
                      className='form-input'
                    >
                      {difficultyOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <FormField label='Mô tả *'>
                  <textarea
                    value={draft.description}
                    onChange={(e) =>
                      handleDraftFieldChange(
                        draft.tempId,
                        'description',
                        e.target.value,
                      )
                    }
                    rows={3}
                    className='form-input'
                    placeholder='Điểm nổi bật hoặc mẹo nhỏ cho món ăn này...'
                  />
                </FormField>

                <div className='grid gap-4 md:grid-cols-3'>
                  <FormField label='Khẩu phần (số người)'>
                    <input
                      type='number'
                      min={1}
                      value={draft.servings}
                      onChange={(e) =>
                        handleDraftFieldChange(
                          draft.tempId,
                          'servings',
                          e.target.value,
                        )
                      }
                      className='form-input'
                    />
                  </FormField>
                  <FormField label='Chuẩn bị (phút)'>
                    <input
                      type='number'
                      min={0}
                      value={draft.prepTime}
                      onChange={(e) =>
                        handleDraftFieldChange(
                          draft.tempId,
                          'prepTime',
                          e.target.value,
                        )
                      }
                      className='form-input'
                    />
                  </FormField>
                  <FormField label='Thời gian nấu (phút)'>
                    <input
                      type='number'
                      min={0}
                      value={draft.cookTime}
                      onChange={(e) =>
                        handleDraftFieldChange(
                          draft.tempId,
                          'cookTime',
                          e.target.value,
                        )
                      }
                      className='form-input'
                    />
                  </FormField>
                </div>

                <FormField label='Hashtag (phân tách bởi dấu phẩy)'>
                  <input
                    type='text'
                    value={draft.tags}
                    onChange={(e) =>
                      handleDraftFieldChange(draft.tempId, 'tags', e.target.value)
                    }
                    className='form-input'
                    placeholder='#healthy, #thuanchay...'
                  />
                </FormField>

                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <p className='text-sm font-semibold text-slate-700'>
                      Nguyên liệu *
                    </p>
                    <div className='space-y-3'>
                      {draft.ingredients.map((item, index) => (
                        <div key={index} className='flex gap-2'>
                          <input
                            type='text'
                            value={item}
                            onChange={(e) =>
                              handleDynamicFieldChange(
                                draft.tempId,
                                'ingredients',
                                index,
                                e.target.value,
                              )
                            }
                            className='form-input flex-1'
                            placeholder='Ví dụ: 200g thịt bò thăn'
                          />
                          <button
                            type='button'
                            onClick={() =>
                              removeDynamicField(
                                draft.tempId,
                                'ingredients',
                                index,
                              )
                            }
                            className='inline-flex items-center justify-center w-9 h-10 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-500'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type='button'
                      onClick={() => addDynamicField(draft.tempId, 'ingredients')}
                      className='text-sm text-indigo-600 font-medium flex items-center gap-1'
                    >
                      <Plus className='w-4 h-4' />
                      Thêm nguyên liệu
                    </button>
                  </div>

                  <div className='space-y-2'>
                    <p className='text-sm font-semibold text-slate-700'>
                      Các bước thực hiện *
                    </p>
                    <div className='space-y-3'>
                      {draft.steps.map((item, index) => (
                        <div key={index} className='flex gap-2'>
                          <textarea
                            value={item}
                            rows={2}
                            onChange={(e) =>
                              handleDynamicFieldChange(
                                draft.tempId,
                                'steps',
                                index,
                                e.target.value,
                              )
                            }
                            className='form-input flex-1'
                            placeholder='Ví dụ: Hầm xương trong 2 giờ...'
                          />
                          <button
                            type='button'
                            onClick={() =>
                              removeDynamicField(draft.tempId, 'steps', index)
                            }
                            className='inline-flex items-center justify-center w-9 h-10 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-500'
                          >
                            <Trash2 className='w-4 h-4' />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      type='button'
                      onClick={() => addDynamicField(draft.tempId, 'steps')}
                      className='text-sm text-indigo-600 font-medium flex items-center gap-1'
                    >
                      <Plus className='w-4 h-4' />
                      Thêm bước thực hiện
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, helper }) => (
  <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col gap-2'>
    <div className='inline-flex items-center gap-2 text-slate-500 text-sm'>
      <Icon className='w-4 h-4' />
      {label}
    </div>
    <span className='text-3xl font-semibold text-slate-900'>{value}</span>
    <p className='text-xs text-slate-500'>{helper}</p>
  </div>
)

const RecipeCard = ({ recipe }) => (
  <div className='bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4'>
    <div className='flex items-start justify-between gap-3'>
      <div>
        <p className='text-xs uppercase tracking-wide text-slate-400'>
          {recipe.category}
        </p>
        <h3 className='text-xl font-semibold text-slate-900'>{recipe.name}</h3>
      </div>
      <span className='px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700'>
        {recipe.difficulty}
      </span>
    </div>

    <img
      src={recipe.image || FALLBACK_RECIPE_IMAGE}
      alt={recipe.name}
      className='w-full h-52 object-cover rounded-2xl border border-slate-100'
      loading='lazy'
    />

    <p className='text-sm text-slate-600'>{recipe.description}</p>

    <div className='flex flex-wrap gap-2 text-xs text-indigo-700'>
      {recipe.tags?.map((tag) => (
        <span
          key={tag}
          className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-50'
        >
          <Tag className='w-3 h-3' />
          {tag}
        </span>
      ))}
    </div>

    <div className='grid gap-4 md:grid-cols-2 text-sm'>
      <div>
        <p className='font-semibold text-slate-700 mb-1'>Nguyên liệu</p>
        <ul className='list-disc list-inside space-y-1 text-slate-600'>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className='font-semibold text-slate-700 mb-1'>Các bước</p>
        <ol className='list-decimal list-inside space-y-1 text-slate-600'>
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>

    <div className='flex flex-wrap gap-3 text-xs text-slate-500'>
      <span className='px-3 py-1 rounded-full bg-slate-100'>
        Chuẩn bị: {recipe.prepTime}’
      </span>
      <span className='px-3 py-1 rounded-full bg-slate-100'>
        Nấu: {recipe.cookTime}’
      </span>
      <span className='px-3 py-1 rounded-full bg-slate-100'>
        Khẩu phần: {recipe.servings} người
      </span>
    </div>
  </div>
)

const FormField = ({ label, children }) => (
  <label className='flex flex-col gap-2 text-sm font-medium text-slate-700'>
    {label}
    {children}
  </label>
)

export default RecipeCollection
