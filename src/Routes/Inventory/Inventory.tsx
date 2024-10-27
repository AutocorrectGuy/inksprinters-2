import Container from '../../layouts/MainLayout/components/Container/Container'
import NavigationTop from './NavigationTop/NavigationTop'
import ArticlesList from './ArticlesList'
import useErrorBackTick from '../../assets/hooks/useErrorBacktick'

const Inventory = () => {
  useErrorBackTick()  
  return (
    <Container hasSearchBar={false} hasFactortyLoaderTop={false} hasCogSettings={false}>
        <div className='flex flex-col grow'>
          <NavigationTop />
          <ArticlesList />
        </div>
    </Container>
  )
}

export default Inventory
