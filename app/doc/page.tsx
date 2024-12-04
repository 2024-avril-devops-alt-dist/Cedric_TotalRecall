// ../doc/page.tsx

import ReactSwagger from './api-doc'

export default async function IndexPage() {
  return (
    <div className='pt-6'>
      <section className='container'>
        <ReactSwagger />
      </section>
    </div>
  )
}