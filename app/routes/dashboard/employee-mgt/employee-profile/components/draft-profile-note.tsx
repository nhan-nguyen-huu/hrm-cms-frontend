import { AlertCircleIcon } from 'lucide-react'
import CardCustom from '~/components/customs/card-custom'

const DraftProfileNote = () => {
  return (
    <CardCustom isHiddenHeader>
      <section className='flex items-center justify-between gap-4'>
        <section className='flex items-center gap-2'>
          <AlertCircleIcon className='text-[#6E7F96]' />
          <p className='text-app-primay'>
            Hồ sơ nháp chưa được cấp mã nhân viên — không tính vào 248 nhân sự, không xuất hiện ở bảng chấm công và bảng
            lương.
          </p>
        </section>
        <p className='text-primary font-semibold'>Tự xoá sau 30 ngày không cập nhật</p>
      </section>
    </CardCustom>
  )
}

export default DraftProfileNote
