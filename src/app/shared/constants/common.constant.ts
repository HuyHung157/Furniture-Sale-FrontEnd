export class CommonConstant {
  //
  public static readonly USER_TOKEN = 'USER_TOKEN';
  public static readonly SUPER_ADMIN_ROLE = 'SUPER_ADMIN';
  public static readonly FIREBASE_USER_CREDENTIAL = 'FIREBASE_USER_CREDENTIAL';

  public static readonly PHONE_CODE_VIETNAMESE = '+84';

  // Paging
  public static readonly PAGING_PAGE_SIZE = 10;
  public static readonly PAGING_PAGE_INDEX = 1;
  public static readonly PAGING_OPTIONS = [10, 25, 50];

  // Input
  public static readonly INPUT_DEBOUNCE_INTERVAL = 500;
  public static readonly INPUT_DEBOUNCE_THRESH_HOLD = 4;

  // SnackBar Config
  public static readonly DEFAULT_SNACKBAR_CONFIG_DURATION = 2500;
  public static readonly DEFAULT_SNACKBAR_CONFIG = {
    duration: CommonConstant.DEFAULT_SNACKBAR_CONFIG_DURATION,
    panelClass: ['default__snack-bar'],
  };
  public static readonly SUCCESS_SNACKBAR_CONFIG = {
    duration: CommonConstant.DEFAULT_SNACKBAR_CONFIG_DURATION,
    panelClass: ['success__snack-bar'],
  };
  public static readonly FAILURE_SNACKBAR_CONFIG = {
    duration: CommonConstant.DEFAULT_SNACKBAR_CONFIG_DURATION,
    panelClass: ['failure__snack-bar'],
  };

  public static readonly EMPTY = '';
  public static readonly FACEBOOK_FIRST_NAME_KEY = 'first_name';
  public static readonly FACEBOOK_LAST_NAME_KEY = 'last_name';

  public static readonly GOOGLE_FIRST_NAME_KEY = 'given_name';
  public static readonly GOOGLE_LAST_NAME_KEY = 'family_name';

  // Data format
  public static readonly DATE_FORMAT_YMD = 'YYYY-MM-DD';

  // Site map
  public static readonly MAX_SITE_PER_SITE_MAP_FILE = 40000;

  // Pattern
  public static readonly PATTERN_PHONE_NUMBER = /^\d{10}$/;
  public static readonly PHONE_NUMBER_REGEX = /^[0-9\-\+]{9,15}$/;
  public static readonly URL_YOUTUBE = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/
}
