define([
  'react',

  'jsx!reactviews/lobbyuserview'
], function(
  React,

  LobbyUserView
) {

  return React.createClass({
    checkHasRenderedUsers: function() {
      var $domNode = $(this.getDOMNode());
      $domNode.toggleClass('lobby', !!$domNode.find('.user').length);
    },

    componentDidMount: function() {
      this.checkHasRenderedUsers();
    },

    componentDidUpdate: function() {
      this.checkHasRenderedUsers();
    },

    render: function() {

      return (

        <div className="lobby-container">
          <section className="upper">
            <h1 className="big-title pulse">Quizcous <span className="under-title">Serving from a local server close to you</span></h1>
          </section>

          <section className="lower">
            <LobbyUserView users={this.props.users}/>
          </section>
        </div>

      );
    }
  });

});