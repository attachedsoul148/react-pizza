import { debounce } from 'lodash'
import React, { useRef, useState, useCallback } from 'react'
import { changeSearch } from '../store/filterSlice'
import { useAppDispatch } from '../store/store'
import style from './Search.module.scss'

const Search = () => {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const debouncedChanges = useCallback(
    debounce((value) => {
      dispatch(changeSearch(value))
    }, 500),
    [],
  )
  return (
    <div className={style.wrapper}>
      <div className={style.search}>
        <svg width="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <title />
          <g id="search">
            <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
          </g>
        </svg>
        <input
          ref={inputRef}
          placeholder="Пошук піци..."
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            debouncedChanges(e.target.value)
          }}
        />
      </div>
      <svg
        className={style.delBtn}
        xmlns="http://www.w3.org/2000/svg"
        baseProfile="tiny"
        height="24px"
        id="Layer_1"
        version="1.2"
        viewBox="0 0 24 24"
        onClick={() => {
          setValue('')
          debouncedChanges('')
          inputRef.current?.focus()
        }}
        width="32px">
        <path d="M12,4c-4.419,0-8,3.582-8,8s3.581,8,8,8s8-3.582,8-8S16.419,4,12,4z M15.707,14.293c0.391,0.391,0.391,1.023,0,1.414  C15.512,15.902,15.256,16,15,16s-0.512-0.098-0.707-0.293L12,13.414l-2.293,2.293C9.512,15.902,9.256,16,9,16  s-0.512-0.098-0.707-0.293c-0.391-0.391-0.391-1.023,0-1.414L10.586,12L8.293,9.707c-0.391-0.391-0.391-1.023,0-1.414  s1.023-0.391,1.414,0L12,10.586l2.293-2.293c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L13.414,12L15.707,14.293z" />
      </svg>
    </div>
  )
}

export default Search
