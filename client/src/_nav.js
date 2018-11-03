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
      name: 'Colors',
      url: '/theme/colors',
      icon: 'icon-drop',
    },
    {
      name: 'Typography',
      url: '/theme/typography',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Backstage Admin',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      divider: true,
    },
    {
      name: 'Data pull',
      url: '/base',
      icon: 'icon-puzzle',
    },
    {
      name: 'Decisions',
      url: '/buttons',
      icon: 'icon-cursor',
    }
  ],
};
