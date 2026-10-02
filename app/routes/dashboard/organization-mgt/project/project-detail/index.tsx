import { useState } from 'react'

import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import TableCustom from '~/components/customs/table-custom'
import { Button } from '~/components/ui/button'
import { organizationMgtColumn } from '~/helpers/columns/organization-mgt-column'
import { commonHelper } from '~/helpers/common.helper'
import { useGetDetailProjectApi } from '~/hooks/apis/use-project-api'
import { usePagination } from '~/hooks/use-pagination'
import AddProjectMemberDialog from '~/routes/dashboard/organization-mgt/components/project/add-project-member-dialog'
import ProjectAllocationCard from '~/routes/dashboard/organization-mgt/components/project/project-allocation-card'
import ProjectDetailHeader from '~/routes/dashboard/organization-mgt/components/project/project-detail-header'
import ProjectInfoCard from '~/routes/dashboard/organization-mgt/components/project/project-info-card'

const ProjectDetailPage = () => {
  // Lib
  const { id } = useParams()
  const { t } = useTranslation()
  const projectId = Number(id) || undefined

  // Table
  const columns = organizationMgtColumn.getProjectMember(t)
  const { paging, setPage, setSize } = usePagination({ isNoSyncParams: true })

  // Query — the detail carries every member (not paginated), so the member table pages on the client
  const { data: project, isLoading } = useGetDetailProjectApi({ id: projectId, options: { enabled: !!projectId } })
  const members = project?.members ?? []
  const { items: pagedMembers, totalPage, page } = commonHelper.paginate(members, paging.page, paging.size)

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false)

  return (
    <section className='flex flex-col gap-4'>
      <ProjectDetailHeader project={project} />
      <section className='grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_340px]'>
        <section className='flex min-w-0 flex-col gap-3'>
          <TableCustom
            headerTitle={t('title.projectMembers')}
            totalItems={members.length}
            headerAction={
              <Button onClick={() => setIsAddMemberOpen(true)} disabled={!project}>
                <Plus className='size-4' />
                <span>{t('action.addMember')}</span>
              </Button>
            }
            loading={isLoading}
            columns={columns}
            data={pagedMembers}
            emptyText={t('empty.noData')}
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
          <ProjectAllocationCard project={project} />
        </section>
      </section>
      <AddProjectMemberDialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen} project={project} />
    </section>
  )
}

export default ProjectDetailPage
