// ../doc/page.tsx

import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default async function IndexPage() {
  return (
    <div className='pt-6'>
      <section className='container'>
         <SwaggerUI url="swagger.yaml" />;
      </section>
    </div>
  )
}