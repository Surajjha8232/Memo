var htmlContent =require('../FrontPage/FrontPage.html');

class FrontPage extends React.Component {
   render(){
      return (
        <div dangerouslySetInnerHTML={ {__html: htmlContent} } />
      );
   }
}
export default FrontPage;