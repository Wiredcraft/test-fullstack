/**
 * Value Label Wrap
 */
export interface ValueLabel<V, L> {
  value: V;
  label: L;
}

export interface KeyValue<V, L> {
  key: V;
  value: L;
}

export type Pagination = {
  keyword?: string;
  limit: number;
  offset: number;
};

export type ViewType = 'list' | 'grid';

export type PageHeaderInfo = {
  icon?: any;
  title: string;
  subTitle?: string;
  breadcrumbItems?: PageHeaderBreadCrumbItem[];
};

export type PageHeaderBreadCrumbItem = {
  path: string;
  breadcrumbName: string;
};

export type ResetPasswordResult = {
  loginID: string;
  password: string;
};
