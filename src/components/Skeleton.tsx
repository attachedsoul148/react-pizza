import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={486}
    viewBox="0 0 280 486"
    backgroundColor="#ededed"
    foregroundColor="#ecebeb">
    <circle cx="140" cy="140" r="140" />
    <rect x="0" y="294" rx="5" ry="5" width="280" height="27" />
    <rect x="0" y="337" rx="10" ry="10" width="280" height="87" />
    <rect x="0" y="441" rx="5" ry="5" width="90" height="27" />
    <rect x="129" y="433" rx="25" ry="25" width="150" height="45" />
  </ContentLoader>
)

export default Skeleton
