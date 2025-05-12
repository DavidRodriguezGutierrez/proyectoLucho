import type { UnifiedNavigationData } from "@mappnext/ds-tw";

export const navigationData: UnifiedNavigationData = {
  logo: "/next.svg",
  user: {
    name: "Santiago Ramos",
    email: "dfghfghfg@hotmail.de",
    avatar: "/avatars/shadcn.jpg",
    menu: [
      {
        type: "group",
        items: [
          {
            type: "item",
            title: "Upgrade to Pro",
            icon: "Sparkles",
            /* onClick: () => alert("Upgrade to Pro clicked!"), */
          },
        ],
      },
      { type: "separator" },
      {
        type: "group",
        items: [
          {
            type: "item",
            title: "Account",
            icon: "BadgeCheck",
            url: "/account",
          },
          {
            type: "item",
            title: "Billing",
            icon: "CreditCard",
            url: "/billing",
          },
          {
            type: "item",
            title: "Notifications",
            icon: "Bell",
            /* onClick: () => alert("Notifications clicked!"), */
          },
        ],
      },
      { type: "separator" },
      {
        type: "item",
        title: "Log out",
        icon: "LogOut",
        /* onClick: () => alert("Log out clicked!"), */
      },
    ],
  },
  teams: [
    { name: "Acme Inc", logo: "GalleryVerticalEnd", plan: "Enterprise" },
    { name: "Acme Corp.", logo: "AudioWaveform", plan: "Startup" },
    { name: "Evil Corp.", logo: "Command", plan: "Free" },
  ],
  items: [
    {
      title: "Usuarios",
      url: "/",
      icon: "user",
      isActive: true,
      description: "Play around with examples",
      children: [
        {
          title: "Lista de Usuarios",
          url: "/view/usuario/list",
          icon: "table-of-contents",
          description: "View your history",
        },
      ],
    },
    {
      title: "Productos",
      url: "/",
      icon: "square-terminal",
      isActive: true,
      description: "Play around with examples",
      children: [
        {
          title: "Lista de Productos",
          url: "/view/producto/list",
          icon: "table-of-contents",
          description: "View your history",
        },
      ],
    },
    {
      title: "Almacenes",
      url: "/models",
      icon: "bot",
      description: "Explore our models",
      children: [
        {
          title: "Lista de Almacenes",
          url: "/view/almacen/list",
          icon: "book",
          description: "The beginning of models",
        },
      ],
    },
    {
      title: "Presentación",
      url: "/docs",
      icon: "book-open",
      description: "Learn how to use the components",
      children: [
        {
          title: "Lista de presentación",
          url: "/view/presentacion/list",
          icon: "info",
          description: "Get an overview",
        },
      ],
    },
    {
      title: "Marca",
      url: "/settings",
      icon: "settings-2",
      description: "Manage your settings",
      children: [
        {
          title: "Lista de Marca",
          url: "/view/marca/list",
          icon: "sliders",
          description: "General preferences",
        },
      ],
    },
    {
      title: "Tipo de marca",
      url: "/settings",
      icon: "square-minus",
      description: "Manage your settings",
      children: [
        {
          title: "Lista de Tipo de marca",
          url: "/view/tipo_marca/list",
          icon: "receipt-text",
          description: "General preferences",
        },
      ],
    },
    {
      title: "Punto de venta",
      url: "/settings",
      icon: "store",
      description: "Manage your settings",
      children: [
        {
          title: "Lista de Punto de venta",
          url: "/view/puntoDeVenta/list",
          icon: "sliders",
          description: "General preferences",
        },
      ],
    },
    {
      title: "Producto por punto de venta",
      url: "/settings",
      icon: "store",
      description: "Manage your settings",
      children: [
        {
          title: "Lista de Punto de venta",
          url: "/view/productoPuntoDeVenta/list",
          icon: "sliders",
          description: "General preferences",
        },
      ],
    },
    {
      title: "Departamento",
      url: "/settings",
      icon: "bold",
      description: "Manage your settings",
      children: [
        {
          title: "Lista de Departamentos",
          url: "/view/departamento/list",
          icon: "sliders",
          description: "General preferences",
        },
      ],
    },
    {
      title: "Ciudad",
      url: "/settings",
      icon: "bold",
      description: "Manage your settings",
      children: [
        {
          title: "Lista de Ciudades",
          url: "/view/ciudad/list",
          icon: "bot",
          description: "General preferences",
        },
      ],
    },
    {
      title: "Familia",
      url: "/settings",
      icon: "user",
      description: "Manage your settings",
      children: [
        {
          title: "Lista de Familia",
          url: "/view/familia/list",
          icon: "receipt-text",
          description: "General preferences",
        },
      ],
    },
    {
      title: "Medida",
      url: "/settings",
      icon: "ruler-dimension-line",
      description: "Manage your settings",
      children: [
        {
          title: "Lista de medida",
          url: "/view/medida/list",
          icon: "ruler",
          description: "General preferences",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "/contact",
      icon: "life-buoy",
    },
  ],
  projects: [
    {
      title: "Design Engineering",
      url: "/projects/design-engineering",
      icon: "frame",
    },
    {
      title: "Sales & Marketing",
      url: "/projects/sales-marketing",
      icon: "pie-chart",
    },
    { title: "Travel", url: "/projects/travel", icon: "map" },
  ],
};

export const defaultThemeConfig = {
  light: {
    background: "#ffffff",
    foreground: "#1f2937",
    card: "#ffffff",
    cardForeground: "#1f2937",
    popover: "#ffffff",
    popoverForeground: "#1f2937",
    primary: "#469910", // igual en ambos modos
    primaryForeground: "#ffffff",
    secondary: "#f59e0b",
    secondaryForeground: "#1f2937",
    muted: "#f3f4f6",
    mutedForeground: "#6b7280",
    accent: "#F2F2F5",
    destructive: "#ef4444",
    destructiveForeground: "#ffffff",
    border: "#e5e7eb",
    input: "#e5e7eb",
    ring: "#3b82f6",
    chart1: "#10b981",
    chart2: "#3b82f6",
    chart3: "#f59e0b",
    chart4: "#6366f1",
    chart5: "#ef4444",
    radius: "0.625rem",
  },
  dark: {
    background: "#2F3840",
    foreground: "#f9fafb",
    card: "#374151",
    cardForeground: "#f9fafb",
    popover: "#374151",
    popoverForeground: "#f9fafb",
    primary: "#469910", // igual en ambos modos
    primaryForeground: "#ffffff",
    secondary: "#fbbf24",
    secondaryForeground: "#1f2937",
    muted: "#4b5563",
    mutedForeground: "#d1d5db",
    accent: "#3E4A59",
    accentForeground: "#ffffff",
    destructive: "#dc2626",
    destructiveForeground: "#ffffff",
    border: "#3E4B5E", // border modificado a blanco esqueleto
    input: "#3E4B5E",
    ring: "#2563eb",
    chart1: "#10b981",
    chart2: "#3b82f6",
    chart3: "#f59e0b",
    chart4: "#6366f1",
    chart5: "#ef4444",
    radius: "0.625rem",
    sidebar: "#2F3840",
  },
};
