export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info'
      },
    },
    {
      title: true,
      name: 'Designers',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Model Choices',
      url: '/theme/colors',
      icon: 'icon-people',
    },
    {
      title: true,
      name: 'Backstage',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      divider: true,
    },
    {
      name: 'Admin',
      url: '/base',
      icon: 'icon-settings',
    }
  ],
};
