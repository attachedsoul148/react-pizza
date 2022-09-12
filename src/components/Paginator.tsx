import React , {useMemo} from 'react'
import { changePage } from '../store/filterSlice'
import { useAppDispatch, useAppUseSelector } from '../store/store'
import style from './Paginator.module.scss'

type PaginatorProps = {
  totalCount: number
}
const Paginator: React.FC<PaginatorProps> = React.memo(({ totalCount = 0 }) => {
  const dispatch = useAppDispatch()
  const currentPage = useAppUseSelector((state) => state.filterSlice.currentPage)
  const pagesCount = useMemo(() => Math.ceil(totalCount / 4) , [totalCount])
  const arr: number[] = []
  for (let i = 1; i <= pagesCount; i++) {
    arr.push(i)
  }
  return (
    <div className={style.wrapper}>
      {currentPage > 1 && (
        <button onClick={() => dispatch(changePage(currentPage - 1))} className={style.btn}>
          {'<'}
        </button>
      )}
      {arr.map((el) => (
        <button
          key={el}
          onClick={() => dispatch(changePage(el))}
          className={currentPage === el ? style.activeBtn : style.btn}>
          {el}
        </button>
      ))}
      {currentPage < pagesCount && (
        <button onClick={() => dispatch(changePage(currentPage + 1))} className={style.btn}>
          {'>'}
        </button>
      )}
    </div>
  )
}
)
export default Paginator
