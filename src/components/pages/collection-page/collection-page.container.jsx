import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux'
import collectionPage from './collection-page'
import { selectIsCollectionLoading } from '../../../redux/shop/shop.selectors'
import WithSpinner from '../../with-spinner/with-spinner'


const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionLoading
})

// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))

const CollectionsPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(collectionPage)

export default CollectionsPageContainer;