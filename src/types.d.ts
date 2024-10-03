export interface Account {
  email: string;
  email_verified: boolean;
  owner: boolean;
  uid: bigint;
  username: string;
}

export interface Style {
  primary_color_text: string;
  primary_color: string;
  secondary_color: string;
  background_color_primary: string;
  background_color_secondary: string;
  background_color_tertiary: string;

  primary_grey: string;
  secondary_grey: string;

  font_size: string;

  transparency: boolean;
  transparency_value: number;
  transparency_blur: string;
}

export interface Response {
  error?: string;
  message?: string;
  token?: string;
}

export interface CloudthemesStatus {
  enabled: boolean;
}

export interface CloudTheme {
  uid: bigint;
  theme: Style;
}
