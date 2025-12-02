import React, { useMemo, useState } from 'react'
import { BookMarked, Clock3, Plus, Search, Tag, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { dummyRecipeCollection } from '../assets/assets'

const blankRecipe = {
  name: '',
  description: '',
  image_url: '',
  difficulty: 'Dễ',
  cooking_time: '',
  tags: ''
}

const difficulties = ['Dễ', 'Trung bình', 'Khó']
const baseInputClasses =
  'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400'

const RecipeCollection = () => {
  const [collection, setCollection] = useState(dummyRecipeCollection)
  const [newRecipes, setNewRecipes] = useState([{ ...blankRecipe }])
  const [searchTerm, setSearchTerm] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const filteredCollection = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase()
    if (!keyword) return collection
    return collection.filter((recipe) => recipe.name.toLowerCase().includes(keyword))
  }, [collection, searchTerm])

  const handleFieldChange = (index, field, value) => {
    setNewRecipes((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const handleAddRecipeForm = () => {
    setNewRecipes((prev) => [...prev, { ...blankRecipe }])
  }

  const handleRemoveRecipeForm = (index) => {
    if (newRecipes.length === 1) return
    setNewRecipes((prev) => prev.filter((_, i) => i !== index))
  }

  const buildRecipePayload = (recipe) => {
    const trimmedName = recipe.name.trim()
    if (!trimmedName) return null

    const normalizedTags =
      typeof recipe.tags === 'string'
        ? recipe.tags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean)
        : []

    const parsedTime = Number(recipe.cooking_time)
    const uniqueId =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `recipe_${Date.now()}_${Math.random().toString(16).slice(2)}`

    return {
      _id: uniqueId,
      name: trimmedName,
      description: recipe.description.trim(),
      image_url: recipe.image_url.trim()
        ? recipe.image_url.trim()
        : 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg',
      difficulty: recipe.difficulty || 'Dễ',
      cooking_time: Number.isNaN(parsedTime) ? null : parsedTime,
      tags: normalizedTags
    }
  }

  const handleSaveRecipes = () => {
    const prepared = newRecipes
      .map(buildRecipePayload)
      .filter((recipe) => Boolean(recipe))

    if (!prepared.length) {
      toast.error('Nhập ít nhất 1 công thức có tên.')
      return
    }

    setIsSaving(true)
    setTimeout(() => {
      setCollection((prev) => [...prepared, ...prev])
      setNewRecipes([{ ...blankRecipe }])
      setIsSaving(false)
      toast.success(`Đã thêm ${prepared.length} công thức vào bộ sưu tập`)
    }, 400)
  }

  return (
    <section className='bg-white rounded-2xl shadow p-6 space-y-6'>
      <div className='flex flex-col gap-1'>
        <p className='text-sm font-semibold text-indigo-600 uppercase tracking-wide'>
          Bộ sưu tập công thức
        </p>
        <h2 className='text-2xl font-bold text-slate-900 flex items-center gap-2'>
          <BookMarked className='w-5 h-5 text-indigo-500' />
          Chia sẻ món yêu thích
        </h2>
        <p className='text-sm text-slate-500'>
          Thêm từng công thức hoặc nhập nhiều công thức trước khi lưu để tạo bộ sưu tập món ăn của
          bạn.
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5' />
          <input
            type='text'
            className='w-full border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40'
            placeholder='Tìm công thức theo tên...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='space-y-4'>
          {newRecipes.map((recipe, index) => (
            <div
              key={index}
              className='border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-3'
            >
              <div className='flex items-center justify-between'>
                <span className='text-sm font-semibold text-slate-700'>
                  Công thức #{index + 1}
                </span>
                {newRecipes.length > 1 && (
                  <button
                    type='button'
                    onClick={() => handleRemoveRecipeForm(index)}
                    className='text-xs text-rose-500 hover:text-rose-600 inline-flex items-center gap-1'
                  >
                    <Trash2 className='w-4 h-4' />
                    Bỏ
                  </button>
                )}
              </div>
              <div className='grid md:grid-cols-2 gap-3'>
                <input
                  type='text'
                  className={baseInputClasses}
                  placeholder='Tên món ăn *'
                  value={recipe.name}
                  onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                />
                <input
                  type='text'
                  className={baseInputClasses}
                  placeholder='Link hình ảnh (tuỳ chọn)'
                  value={recipe.image_url}
                  onChange={(e) => handleFieldChange(index, 'image_url', e.target.value)}
                />
              </div>
              <textarea
                className={`${baseInputClasses} min-h-[72px]`}
                placeholder='Mô tả ngắn gọn...'
                value={recipe.description}
                onChange={(e) => handleFieldChange(index, 'description', e.target.value)}
              />
              <div className='grid md:grid-cols-3 gap-3'>
                <select
                  className={baseInputClasses}
                  value={recipe.difficulty}
                  onChange={(e) => handleFieldChange(index, 'difficulty', e.target.value)}
                >
                  {difficulties.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <input
                  type='number'
                  className={baseInputClasses}
                  placeholder='Thời gian (phút)'
                  min='0'
                  value={recipe.cooking_time}
                  onChange={(e) => handleFieldChange(index, 'cooking_time', e.target.value)}
                />
                <input
                  type='text'
                  className={baseInputClasses}
                  placeholder='Thẻ tag, ngăn cách bằng dấu phẩy'
                  value={recipe.tags}
                  onChange={(e) => handleFieldChange(index, 'tags', e.target.value)}
                />
              </div>
            </div>
          ))}

          <div className='flex flex-wrap gap-3'>
            <button
              type='button'
              className='px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg flex items-center gap-2 hover:bg-indigo-100'
              onClick={handleAddRecipeForm}
            >
              <Plus className='w-4 h-4' />
              Thêm dòng công thức
            </button>
            <button
              type='button'
              disabled={isSaving}
              className='px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 disabled:opacity-70'
              onClick={handleSaveRecipes}
            >
              {isSaving ? 'Đang lưu...' : 'Lưu vào bộ sưu tập'}
            </button>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-slate-900'>Danh sách món ăn</h3>
          <span className='text-xs text-slate-500 uppercase tracking-widest'>
            {filteredCollection.length} công thức
          </span>
        </div>
        {filteredCollection.length === 0 ? (
          <div className='text-center py-10 text-slate-500 text-sm'>
            Không tìm thấy món ăn phù hợp với từ khóa “{searchTerm}”.
          </div>
        ) : (
          <div className='grid gap-4 md:grid-cols-2'>
            {filteredCollection.map((recipe) => (
              <article
                key={recipe._id}
                className='border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/80'
              >
                <div className='h-40 overflow-hidden'>
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className='w-full h-full object-cover'
                    loading='lazy'
                  />
                </div>
                <div className='p-4 space-y-3'>
                  <div className='flex items-start justify-between gap-2'>
                    <h4 className='font-semibold text-slate-900'>{recipe.name}</h4>
                    {recipe.cooking_time && (
                      <span className='text-xs text-slate-500 inline-flex items-center gap-1'>
                        <Clock3 className='w-3 h-3' />
                        {recipe.cooking_time}m
                      </span>
                    )}
                  </div>
                  <p className='text-sm text-slate-600'>{recipe.description}</p>
                  <div className='flex items-center justify-between text-xs text-slate-500'>
                    <span className='font-semibold'>{recipe.difficulty}</span>
                    <div className='flex flex-wrap gap-1'>
                      {recipe.tags?.map((tag) => (
                        <span
                          key={tag}
                          className='inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600'
                        >
                          <Tag className='w-3 h-3' />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default RecipeCollection
