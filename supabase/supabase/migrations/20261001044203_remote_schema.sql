drop extension if exists "pg_net";

alter type "public"."position" rename to "position__old_version_to_be_dropped";

create type "public"."position" as enum ('Physicians', 'Registered Nurses', 'Nurse Practitioners', 'Physician Assistants', 'Intern', 'Nurse');

alter type "public"."specialty" rename to "specialty__old_version_to_be_dropped";

create type "public"."specialty" as enum ('Internal Medicine', 'Pediatrics', 'Cardiology', 'Dermatology', 'Psychiatry', 'Emergency Medicine', 'Obstetrics & Gynecology', 'Orthopedics', 'Radiology', 'General');

alter table "public"."STAFF" alter column position type "public"."position" using position::text::"public"."position";

alter table "public"."STAFF" alter column specialty type "public"."specialty" using specialty::text::"public"."specialty";

drop type "public"."position__old_version_to_be_dropped";

drop type "public"."specialty__old_version_to_be_dropped";

create or replace view "public"."dental_record_view" as  SELECT (dv.id)::text AS dental_visit_id,
    concat_ws(' '::text, pp.first_name, pp.middle_name, pp.last_name) AS patient_name,
    pp.patient_id,
    pp.complete_address AS address,
    pp.barangay,
    (pp.age)::text AS age,
    pp.contact_no AS "mobileNumber",
    (pp.sex)::text AS sex,
    (pp.birthday)::text AS birthday,
    pp.civil_status,
    concat_ws(' - '::text, (pp.school_year)::text, pp.section) AS year_section,
    pp.course,
    dv.status,
    (dv.visit_date)::text AS dental_visit_date,
    dv.last_dental_visit AS last_visit,
    (dv.floss)::text AS floss,
    dv.brushing_frequency AS brush_frequency,
    dv.calculus_severity AS calculus,
    dv.current_medications AS medication,
    dv.notes,
    ARRAY[]::text[] AS medical_history,
    COALESCE(( SELECT jsonb_agg(jsonb_build_object('id', o.id, 'appointment_id', o.dental_record_id, 'patient_id', o.patient_id, 'tooth_number', o.tooth_number, 'dentition',
                CASE
                    WHEN (o.is_permanent = true) THEN 'permanent'::text
                    WHEN (o.is_permanent = false) THEN 'temporary'::text
                    ELSE NULL::text
                END, 'condition', o.condition, 'notes', o.notes) ORDER BY o.tooth_number) AS jsonb_agg
           FROM public."ODONTOGRAM" o
          WHERE (o.dental_record_id = dv.id)), '[]'::jsonb) AS tooth_records
   FROM (public."DENTAL_VISIT" dv
     JOIN public."PATIENT_PROFILE" pp ON ((pp.patient_id = dv.patient_id)));


create or replace view "public"."dental_tab" as  SELECT dv.id,
    dv.patient_id,
    concat_ws(' '::text, pp.first_name, pp.middle_name, pp.last_name) AS patient_name,
    pp.course,
    dv.visit_date,
    dv.staff_id,
    dv.status
   FROM (public."DENTAL_VISIT" dv
     JOIN public."PATIENT_PROFILE" pp ON ((pp.patient_id = dv.patient_id)));


create or replace view "public"."medical_tab" as  SELECT mv.id,
    mv.patient_id,
    concat_ws(' '::text, pp.first_name, pp.middle_name, pp.last_name) AS patient_name,
    pp.course,
    mv.visit_date,
    mv.staff_id,
    mv.status
   FROM (public."MEDICAL_VISIT" mv
     JOIN public."PATIENT_PROFILE" pp ON ((pp.patient_id = mv.patient_id)));



