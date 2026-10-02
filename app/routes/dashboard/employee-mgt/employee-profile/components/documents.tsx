import { useEffect, useMemo, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Upload } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import FilterPanel from '~/components/common/filter-panel'
import AlertDialogCustom from '~/components/customs/alert-dialog-custom'
import TableCustom from '~/components/customs/table-custom'
import { Button } from '~/components/ui/button'
import { paramsHelper } from '~/helpers'
import { employeeMgtColumn } from '~/helpers/columns/employee-mgt-column'
import { commonHelper } from '~/helpers/common.helper'
import { formHelper } from '~/helpers/form.helper'
import {
  type TFilterPanelEmployeeDocumentFormSchema,
  getFilterPanelEmployeeDocumentSchema
} from '~/helpers/schema.helper'
import { useGetEmployeeDocumentsApi } from '~/hooks/apis/use-employee-api'
import useMutationApi from '~/hooks/use-mutation-api'
import { DEFAULT_PAGING, usePagination } from '~/hooks/use-pagination'
import useQueryParams from '~/hooks/use-query-params'
import { useTransferEnum } from '~/hooks/user-transfer-enum'
import DocumentRowMenu from '~/routes/dashboard/employee-mgt/employee-profile/components/documents/document-row-menu'
import {
  DocumentStatsCard,
  DocumentWarningsCard,
  PendingDocumentsCard
} from '~/routes/dashboard/employee-mgt/employee-profile/components/documents/document-side-cards'
import UploadDocumentDialog from '~/routes/dashboard/employee-mgt/employee-profile/components/documents/upload-document-dialog'
import UploadDropzoneCard from '~/routes/dashboard/employee-mgt/employee-profile/components/documents/upload-dropzone-card'
import { EmployeeService } from '~/services/employee.service'
import { COMMON_CONSTANT } from '~/shared/constants/common.constant'
import { DATA } from '~/shared/constants/data.constant'
import { MOCK_DOCUMENT_WARNINGS, MOCK_PENDING_DOCUMENTS } from '~/shared/constants/mock-employee-detail.constant'
import { QUERY_KEY } from '~/shared/constants/query-key.constant'
import { EEmployeeDocumentStatus, EEmployeeDocumentType, EEmployeeProfileDetailTab } from '~/shared/enums/common.enum'
import { EFilterPanelEmployeeDocumentFormKey, EFilterPanelFormKey } from '~/shared/enums/form.enum'
import type { IEmployee, IEmployeeDocument } from '~/shared/models/employee.model'

const DEFAULT_VALUES: TFilterPanelEmployeeDocumentFormSchema = {
  [EFilterPanelFormKey.Keyword]: '',
  [EFilterPanelEmployeeDocumentFormKey.DocumentType]: EEmployeeDocumentType.All,
  [EFilterPanelEmployeeDocumentFormKey.Status]: EEmployeeDocumentStatus.All
}

interface IDocumentsProfileProps {
  data?: IEmployee
}

// "Tài liệu" tab of the employee detail (design CmsHoSoTaiLieu)
const DocumentsProfile = ({ data }: IDocumentsProfileProps) => {
  // Lib
  const { t } = useTranslation()
  const { getTranslateEnum } = useTransferEnum()
  const queryClient = useQueryClient()
  const userId = data?.id

  // Query
  const { searchParams, setQuery, updateQueries } = useQueryParams()

  // Table
  const [uploadFile, setUploadFile] = useState<File>()
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [deletingDocument, setDeletingDocument] = useState<IEmployeeDocument>()
  const columns = employeeMgtColumn.getDocument(t, getTranslateEnum, {
    renderAction: (row) => <DocumentRowMenu document={row} onDelete={setDeletingDocument} />
  })

  // Pagination
  const { paging, setPage, setSize, getResetPaging, getSearchPaging, resetPaging } = usePagination()

  // Form
  const filterPanelForm = useForm<TFilterPanelEmployeeDocumentFormSchema>({
    resolver: zodResolver(getFilterPanelEmployeeDocumentSchema()),
    defaultValues: formHelper.getDefaultValuesEmployeeDocument(searchParams, DEFAULT_VALUES),
    mode: 'all'
  })

  // Convert data
  const handleConvertData = () => ({ ...paging, ...filterPanelForm.getValues() })

  // API — returns every document (no paging / filter params), so the applied filters (URL) are used client-side
  const {
    data: documents,
    isLoading,
    isRefetching
  } = useGetEmployeeDocumentsApi({
    id: userId,
    options: { enabled: !!userId }
  })
  const keyword = searchParams.get(EFilterPanelFormKey.Keyword)
  const documentType = searchParams.get(EFilterPanelEmployeeDocumentFormKey.DocumentType)
  const status = searchParams.get(EFilterPanelEmployeeDocumentFormKey.Status)
  const isAll = (value: string | null) => !value || value === COMMON_CONSTANT.FILTER_ALL
  const filteredDocuments = useMemo(
    () =>
      (documents ?? []).filter(
        (document) =>
          commonHelper.includesKeyword(keyword, document.originalFileName, document.note) &&
          (isAll(documentType) || document.documentType === documentType) &&
          (isAll(status) || document.status === status)
      ),
    [documents, keyword, documentType, status]
  )
  const { items, totalPage, page } = commonHelper.paginate(filteredDocuments, paging.page, paging.size)

  const { mutate: deleteDocument } = useMutationApi({
    mutationFn: (document: IEmployeeDocument) => EmployeeService.DeleteEmployeeDocument(userId, document.id),
    onSuccess: () => {
      toast.success(t('msg.deleteDocumentSuccess'))
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEE.GET_DOCUMENTS] })
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.EMPLOYEE.GET_EVENTS] })
    }
  })

  // Search
  const handleSearch = () => {
    setPage(DEFAULT_PAGING.PAGE)
    updateQueries({ ...getSearchPaging(), ...handleConvertData() })
  }

  // Reset
  const handleReset = () => {
    filterPanelForm.reset(DEFAULT_VALUES)
    resetPaging()
    updateQueries({ ...getResetPaging(), ...DEFAULT_VALUES })
  }

  const openUpload = (file?: File) => {
    setUploadFile(file)
    setIsUploadOpen(true)
  }

  // Sync data and url
  useEffect(() => {
    setQuery(
      paramsHelper.employeeDocumentToSearchParams(searchParams, DEFAULT_VALUES, EEmployeeProfileDetailTab.Documents)
    )
  }, [])

  return (
    <section className='grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]'>
      <section className='flex min-w-0 flex-col gap-4'>
        {/* Filter */}
        <FilterPanel
          onSearch={handleSearch}
          onReset={handleReset}
          form={filterPanelForm}
          fields={[
            {
              type: 'INPUT_GROUP',
              name: EFilterPanelFormKey.Keyword,
              placeholder: t('inputPlaceholder.searchDocument')
            },
            {
              type: 'SELECT',
              name: EFilterPanelEmployeeDocumentFormKey.DocumentType,
              options: DATA.GET_OPTIONS_EMPLOYEE_DOCUMENT_TYPE(t)
            },
            {
              type: 'SELECT',
              name: EFilterPanelEmployeeDocumentFormKey.Status,
              options: DATA.GET_OPTIONS_EMPLOYEE_DOCUMENT_STATUS(t)
            }
          ]}
        />

        {/* Action + Table */}
        <TableCustom
          headerTitle={t('title.employeeDocuments')}
          headerAction={
            <Button type='button' onClick={() => openUpload()}>
              <Upload className='size-4' />
              {t('action.upload')}
            </Button>
          }
          totalItems={filteredDocuments.length}
          loading={isLoading || isRefetching}
          columns={columns}
          data={items}
          emptyText={t('empty.noData')}
          getRowId={(row) => String(row.id)}
          page={page}
          totalPage={totalPage}
          onPageChange={setPage}
          pageSize={paging.size}
          onPageSizeChange={setSize}
          // No detail page for a document
          disableNavigationAll
        />

        <UploadDropzoneCard onPick={openUpload} />
      </section>

      <section className='flex flex-col gap-4'>
        {/* TODO: approval flow / expiry check have no API yet — sample from the design until the BE adds them */}
        <PendingDocumentsCard items={MOCK_PENDING_DOCUMENTS} />
        <DocumentWarningsCard items={MOCK_DOCUMENT_WARNINGS} />
        <DocumentStatsCard documents={documents ?? []} />
      </section>

      <UploadDocumentDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        userId={userId}
        initialFile={uploadFile}
      />
      <AlertDialogCustom
        open={!!deletingDocument}
        onOpenChange={(open) => !open && setDeletingDocument(undefined)}
        isWarning
        title={t('title.deleteDocument')}
        description={t('msg.deleteDocumentConfirm', { name: deletingDocument?.originalFileName ?? '' })}
        okText={t('action.delete')}
        onOkAction={() => deletingDocument && deleteDocument(deletingDocument)}
      />
    </section>
  )
}

export default DocumentsProfile
