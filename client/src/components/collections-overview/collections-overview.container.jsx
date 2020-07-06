import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CollectionsOverview from './collections-overview'
import {  selectIsCollectionLoading } from '../../redux/shop/shop.selectors'
import WithSpinner from '../with-spinner/with-spinner'
import { compose } from 'redux'


const mapStateToProps = createStructuredSelector({
    isLoading : selectIsCollectionLoading
})

// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))

const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;