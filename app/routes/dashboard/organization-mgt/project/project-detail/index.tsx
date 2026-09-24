import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import TableCustom from '~/components/customs/table-custom'
import { Button } from '~/components/ui/button'
import { projectMemberColumn } from '~/helpers/columns/project-member-column'
import { usePagination } from '~/hooks/use-pagination'
import ProjectAllocationCard from '~/routes/dashboard/organization-mgt/components/project/project-allocation-card'
import ProjectDetailHeader from '~/routes/dashboard/organization-mgt/components/project/project-detail-header'
import ProjectInfoCard from '~/routes/dashboard/organization-mgt/components/project/project-info-card'
import { getMockProjectDetail } from '~/shared/constants/mock-project.constant'

const ProjectDetailPage = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const columns = projectMemberColumn.getList(t)
  const { paging, setPage, setSize } = usePagination({ isNoSyncParams: true })

  // TODO: replace with the project detail API (GET /projects/:id) once available
  const project = getMockProjectDetail(id)
  const members = project?.members ?? []

  const totalPage = Math.ceil(members.length / paging.size)
  const page = Math.min(paging.page, Math.max(totalPage - 1, 0))
  const pagedMembers = members.slice(page * paging.size, (page + 1) * paging.size)

  return (
    <section className='flex flex-col gap-4'>
      <ProjectDetailHeader project={project} />
      <section className='grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]'>
        <section className='flex min-w-0 flex-col gap-3'>
          <TableCustom
            headerTitle={t('title.projectMembers')}
            totalItems={members.length}
            headerAction={
              // TODO: open the "add member" modal (design screen CmsDuAnThemThanhVien)
              <Button>
                <Plus className='size-4' />
                <span>{t('action.addMember')}</span>
              </Button>
            }
            columns={columns}
            data={pagedMembers}
            emptyText={t('empty.noData')}
            getRowId={(row) => row.id ?? row.code ?? ''}
            page={page}
            totalPage={totalPage}
            onPageChange={setPage}
            pageSize={paging.size}
            onPageSizeChange={setSize}
            disableNavigationAll
          />
        </section>
        <section className='flex flex-col gap-4'>
          <ProjectInfoCard project={project} />
          <ProjectAllocationCard summary={project?.allocationSummary} />
        </section>
      </section>
    </section>
  )
}

export default ProjectDetailPage
