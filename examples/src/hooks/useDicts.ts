import type { DictBaseOptions, DictDataListRecord, DictDataLoadingRecord, LoadDict, OriginDictData } from '@zdzz/shared';
import { computed, toRefs, unref } from 'vue';
import { defHttp } from '@/utils/defHttp';
import { Dict } from '@zdzz/shared';
export type DictTypes =
| 'sys_user_sex' // 性别
| 'sys_edu_study' // 学历
| 'exam_questions_type' // 题目类型
| 'sys_normal_disable'
| 'sys_notice_type'
| 'sys_user_sex'
| 'report_type'
| 'industry' // 所属产业
| 'property' // 建设性质
| 'plant_type' // 厂房类型
| 'plant_type_second' // 厂房类型二
| 'land_status' // 用地落实情况
| 'environment' // 环评情况
| 'bid_type' // 招投标情况
| 'industry_investment' // 纳入工业投资统计情况
| 'park_level'
| 'build_status' // 建设状态
| 'completion_status' // 开竣工状态
| 'product_type' // 产业类型
| 'approval' //     立项批复情况
| 'land_content' //     用地落实情况
| 'environmental_content' //     环评情况
| 'bidding_situation' //     招投标情况
| 'building_content'; //     施工许可

const getDicts: LoadDict<DictTypes> = (dictType) => {
  return new Promise<OriginDictData[]>((resolve, reject) => {
    defHttp
      .get<ResponseData<OriginDictData[]>>({
        url: `/api/sys/type/${dictType}`,
      }, {
        withToken: false,
        ignoreCancelToken: true,
      })
      .then((res) => {
        if (!res.data) {
          reject(
            `[Dictionary error] Get dictionary data \`${dictType}\` with null.Please check your dictionary key with \`${dictType}\`.`,
          );
        }
        else {
          resolve(res.data);
        }
      }).catch((e) => {
        reject(e);
      });
  });
};
interface BaseDicts<DT extends string, F, L> {
  dicts: DictDataListRecord<DT>;
  dictsLoading: DictDataLoadingRecord<DT>;
  format: F;// typeof format;
  load: L; // typeof load;
}
export function useDicts<DT extends DictTypes = DictTypes>(dts: DT[], options: Partial<DictBaseOptions> = {}) {
  const dict = new Dict<DT>(dts, getDicts, options);
  // debug
  Dict.debug = true;
  const format = dict.format.bind(dict);
  const load = dict.load.bind(dict);
  const dicts = computed (() => dict.data.value);
  const dictsLoading = computed (() => dict.loading.value);
  const useRuoyiDictsReturn = {
    format,
    load,
    dicts,
    dictsLoading,
    ...toRefs(unref(dict.data)),
    ...toRefs(unref(dict.loading)),
  };

  type UseRuoyiDictsReturn = RecordRef<DictDataListRecord<DT>>
  & RecordRef<DictDataLoadingRecord<DT>>
  & BaseDicts<DT, typeof format, typeof load>;
  return useRuoyiDictsReturn as unknown as UseRuoyiDictsReturn;
}

