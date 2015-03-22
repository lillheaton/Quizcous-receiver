define([
  'react'
], function(
  React
) {

  var LobbyUserView = React.createClass({

    render: function() {

      var createUser = function(user) {
        if (!user.data.color || !user.data.name) return null;

        var containerClasses = "user " + (user.data.lobbyReady ? 'ready' : '');

        return (

          <div key={user.id} className={containerClasses} data-id={user.id}>
          
            <div className="color" style={{ background: user.data.color }}>
              <div className="checkmark"></div>
            </div>

            <div className="name">{user.data.name}</div>
          </div>

        );
      };

      return (
        <section>
          {this.props.users.map(createUser)}
        </section>
      );
    }

  });


  var LobbyView = React.createClass({
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


  return LobbyView;

});