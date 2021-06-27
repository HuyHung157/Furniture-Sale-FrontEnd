export class AppRoutingConstants {
  public static readonly APP = [''];
  public static readonly AUTH = ['auth'];
  public static readonly ADMIN = ['admin'];

  /* ----------------------------------------- */
  /*                HOME                       */
  /* ----------------------------------------- */
  public static readonly ABOUT_PAGE = AppRoutingConstants.APP.concat('about');
  public static readonly CONTACT_PAGE = AppRoutingConstants.APP.concat('contact');
  
  public static readonly SHOPPING_CART_PAGE = AppRoutingConstants.APP.concat('cart');
  public static readonly CART_DETAIL = AppRoutingConstants.SHOPPING_CART_PAGE.concat('detail');


  /* ----------------------------------------- */
  /*                ADMIN                      */
  /* ----------------------------------------- */
  public static readonly PRODUCT_MANAGEMENT = AppRoutingConstants.ADMIN.concat('product');
  public static readonly PRODUCT_LIST = AppRoutingConstants.PRODUCT_MANAGEMENT.concat('list');
  public static readonly PRODUCT_CREATE = AppRoutingConstants.PRODUCT_MANAGEMENT.concat('create');
  public static readonly PRODUCT_UPDATE = AppRoutingConstants.PRODUCT_MANAGEMENT.concat('update');

  public static readonly CATEGORY_MANAGEMENT = AppRoutingConstants.ADMIN.concat('category');
  public static readonly CATEGORY_LIST = AppRoutingConstants.CATEGORY_MANAGEMENT.concat('list');
  public static readonly CATEGORY_CREATE = AppRoutingConstants.CATEGORY_MANAGEMENT.concat('create');
  public static readonly CATEGORY_UPDATE = AppRoutingConstants.CATEGORY_MANAGEMENT.concat('update');

  /* ----------------------------------------- */
  /*                AUTH                      */
  /* ----------------------------------------- */
    public static readonly SIGN_IN = AppRoutingConstants.APP.concat('sign-in');
    public static readonly SIGN_UP = AppRoutingConstants.APP.concat('sign-up');
}