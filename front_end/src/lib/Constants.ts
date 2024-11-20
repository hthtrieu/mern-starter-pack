import { routerPaths } from '@/routes/path';

interface LevelMap {
  [key: number]: string;
}

export default class Constants {
  static ACCESS_TOKEN = 'accessToken';
  static REFRESH_TOKEN = 'refreshToken';

  static INPUT_TYPE = {
    TEXT: 'text',
    EMAIL: 'email',
    PASSWORD: 'password',
    CHECKBOX: 'checkbox',
    CIRCLE_CHECKBOX: 'circle_checkbox',
    SELECT: 'select',
    TEXTAREA: 'textarea',
    MONTH_PICKER: 'month_picker',
    MONTH_RANGE_PICKER: 'month_range_picker',
    EDITOR: 'editor',
    FILE_UPLOAD: 'file',
    RADIO: 'radio',
    INPUT_CHECK: 'input_check',
    RE_CAPTCHA: 're_captcha',
    AVATAR: 'avatar',
  };

  static DEFAULT_PAGESIZE = 6;

  static SORT_BY = [
    {
      key: 'latest',
      label: 'Latest',
    },
    {
      key: 'oldest',
      label: 'Oldest',
    },
    // {
    //     key: "desc",
    //     label: "Z-A"
    // },
    // {
    //     key: "asc",
    //     label: "A-Z"
    // },
    {
      key: 'level_asc',
      label: 'Level Asc',
    },
    {
      key: 'level_desc',
      label: 'Level Desc',
    },
  ];

  static ROLE = {
    ADMIN: 1,
    USER: 10,
  };

  static PAGINATION = {
    LIMIT: 6,
    SIBLING_COUNT: 8,
  };

  static SidebarNavItems = [
    // {
    //   href: routerPaths.ADMIN_SETS,
    //   title: 'Sets',
    // },
    // {
    //   href: routerPaths.ADMIN_PENDING_SETS,
    //   title: 'Pending Sets',
    // },
    // {
    //   href: routerPaths.ADMIN_SETS_MULTIPLE_CHOICE_TEST,
    //   title: 'Tests',
    // },
  ];
}
