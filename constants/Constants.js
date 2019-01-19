export default {
    // Icons
    NEW_MAIL_ITEM_IMAGES: {
      ACCEPTED: 'https://cdn2.iconfinder.com/data/icons/social-buttons-2/512/thumb_up-128.png',
      DECLINED: 'https://cdn.iconscout.com/icon/free/png-256/cross-decline-false-reject-wrong-no-sign-6030.png',
      REPEAT: 'https://cdn.iconscout.com/icon/free/png-256/repeat-single-button-arrow-clockwise-37879.png'
    },
    RECEIVED_MAIL_ITEM_STATUS_ICONS:{
      ACCEPTED: 'https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099__340.png',
      DECLINED: 'https://img.icons8.com/cotton/2x/cancel.png'
    },
    MAILBOX_ICON: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Azure.png',

    // Lables
    TIME_PASSED: 'TIME PASSED',
    NEW_MAIL_ITEM_DECISION_VERBAL:{
      ACCEPTED: 'ACCEPTED',
      DECLINED: 'DECLINED',
      REPEAT: 'REPEAT WAS REQUESTED'
    },
    SAVE_LBL: 'Save',
    CITY_LBL: 'City',
    ADDRESS_LBL: 'Address',
    ZIP_CODE_LBL: 'Zip Code',
    UNIQUE_IDENTIFIER_LBL: 'Unique identifier',
    UPDATE_SETTINGS_LBL: 'Update settings',
    DEFAULT_BEHAVIOR_AFTER_LBL: 'Default behavior after',
    OPEN_BY_DEFAULT_LBL: 'Open by default',
    MAILBOX_INFO_LBL: 'Mailbox info',
    ITEMS_LBL: 'Items',
    SETTINGS_LBL: 'Settings',
    MAILBOXES_LBL: 'Mailboxes',
    MAILBOX_ITEM_DETAILS: 'Mailbox item details',

    // Firebase function URLs
    FUNCTIONS_URL:{
      GET_MAILBOX_SETTINGS: 'https://us-central1-peepnee-backend.cloudfunctions.net/getMailboxSettings?mailboxId=',
      UPDATE_MAIL_ITEM_STATUS: 'https://us-central1-peepnee-backend.cloudfunctions.net/updateMailItemStatus',
      GET_MAILBOX_ITEMS: 'https://us-central1-peepnee-backend.cloudfunctions.net/getMailboxItems?mailboxId=',
      GET_MY_MAILBOXES: 'https://us-central1-peepnee-backend.cloudfunctions.net/getMyMailboxes?userId='
    }
  };