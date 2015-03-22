define([
  'react'
], function(
  React
) {

  return React.createClass({

    render: function() {

      var createUser = function(user) {
        if (!user.data.color || !user.data.name) return null;

        var containerClasses = "user " + (user.data.lobbyReady ? 'ready' : '')

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

});